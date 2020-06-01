import {Client, ExprArg, query} from "faunadb";
import Do = query.Do;


const Force = async (server: Client, queries: ExprArg[]) => {
    await server.query(Do(queries));
};

const Peace = async (server: Client, queries: ExprArg[]) => {
    await Promise.all(queries.map(async query => {
        try {
            await server.query(query);
        } catch (e) {
            console.log(e);
            if (e.name !== "BadRequest") {
                throw e;
            }
        }
    }))
};


export {Force, Peace};
