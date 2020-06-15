import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";

import {ApiCall} from "../interfaces/ApiCall";
import {randomString} from "../util/security";
import {User} from "../db/objects/user";
import {mapper} from "../db";


const inputSchema = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    pattern: '^[a-z0-9\\._%+!$&*=^|~#%{}/\\-]+@([a-z0-9\\-]+\\.){1,}([a-z]{2,22})$',
                },
                username: {
                    type: 'string',
                    minLength: 5,
                    maxLength: 40,
                },
                password: {
                    type: 'string',
                    length: 40,
                },
            },
            required: ['email', 'username', 'password']
        }
    }
};

type Input = {
    email: string;
    username: string;
    password: string;
}

const logic: middy.Middy<any, any> = middy(async (event: ApiCall<Input>) => {
    const {email, password, username} = event.body;
    const salt = randomString(10);

    try {

    } catch (e) {

    }

    await Object.assign(new User(), {
        email,
        password,
        username,
        salt,
    }).put();
});

export const handler = logic
    .use(jsonBodyParser())
    .use(validator({inputSchema}));
