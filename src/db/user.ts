import {query} from "faunadb";
import {ServerClient} from "./index";

export const User = {
    create () {
        return ServerClient.query(
            query.Create(
                query.Collection('posts'),
                { data: { title: 'What I had for breakfast ..' } },
            )
        )
    }
};
