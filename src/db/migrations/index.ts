import {Client} from "faunadb";

import base from './jobs/base';

export default async (server: Client) => {
    try {
        await base(server);
    } catch (e) {
        console.log(e);
    }

}
