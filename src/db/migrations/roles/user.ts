import {query} from "faunadb";
import CreateRole = query.CreateRole;
import Collection = query.Collection;
import Query = query.Query;
import Lambda = query.Lambda;
import Select = query.Select;
import Var = query.Var;
import Index = query.Index;
import Let = query.Let;
import Identity = query.Identity;
import Equals = query.Equals;
import Get = query.Get;


export const UserCreated = Query(
    Lambda("salaryRef", Let(
        {
            user: Get(Var("userRef")),
            userRef: Select( ["data", "user"], Var("user"))
        },
        Equals(Var("userRef"), Identity()),
    ))
);


export const UserRole = CreateRole({
    name: "user_role",
    membership: {
        resource: Collection("User")
    },
    privileges: [
        {
            resource: Index("allCameras"),
            actions: { read: true }
        },
        {
            resource: Collection("Camera"),
            actions: {
                read: true,
                create: true,
                delete: UserCreated,
                write: UserCreated,
            }
        }
    ]
});
