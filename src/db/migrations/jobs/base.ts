import {Client, query} from "faunadb";
import Function = query.Function;
import Query = query.Query;
import Create = query.Create;
import Collection = query.Collection;
import Select = query.Select;
import Update = query.Update;
import Lambda = query.Lambda;
import Var = query.Var;
import Login = query.Login;
import Match = query.Match;
import Index = query.Index;
import {Force, Peace} from "../helpers";
import {UserRole} from "../roles/user";


const createUser = Lambda(["input"],
    Create(Collection("User"), {
        data: {
            username: Select("username", Var("input")),
            email: Select("email", Var("input")),
        },
        credentials: {
            password: Select("password", Var("input"))
        }
    })
);

const loginUser = Lambda(["input"],
    Select(
        "secret",
        Login(
            Match(Index("unique_User_username"), Select("username", Var("input"))),
            {password: Select("password", Var("input"))}
        )
    )
);


export default async (server: Client) => {
    await Force(server, [
        Update(Function("create_user"), {
            "body": Query(createUser)
        }),
        Update(Function("login_user"), {
            "body": Query(loginUser)
        }),
    ]);
    console.log("Created forcefully: CreateUser, LoginUser");

    await Peace(server, [
        UserRole,
    ]);
    console.log("Created peacefully: UserRole");

    console.log('Done with base migration!');
}
