import {Client} from "faunadb";
import {APIGatewayProxyResult} from "aws-lambda";

import migrations from "./migrations";


const ServerClient = new Client({ secret: process.env.FAUNADB_SECRET || '' });

const migrate = async (): Promise<APIGatewayProxyResult> => {
    console.log('\x1b[32m\x1b[33m%s\x1b[0m', 'Running migration');

    await migrations(ServerClient);

    return {
        body: JSON.stringify({
            message: "Done!",
        }),
        statusCode: 200,
    };
};

export {ServerClient, migrate}
