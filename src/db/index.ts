import {Client} from "faunadb";

const ServerClient = new Client({ secret: process.env.FAUNADB_SECRET || '' });

export {ServerClient}
