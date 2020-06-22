import middy from "@middy/core";
import validator from "@middy/validator";
import crypto from "crypto";

import {ApiHandler} from "../interfaces/ApiCall";
import {randomString} from "../util/security";
import {User} from "../db/objects/user";
import {apiErrorHandler} from "../middleware/errorHandler";
import {jsoner} from "../middleware/jsoner";
import {ApiError} from "../interfaces/ApiError";


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
                    minLength: 128,
                    maxLength: 128,
                },
            },
            required: ['email', 'username', 'password'],
        }
    }
};

type Input = {
    email: string;
    username: string;
    password: string;
}

const logic: ApiHandler<Input> = middy(async (event) => {
    const {email, password, username} = event.body;
    const salt = randomString(32);

    try {
        await User.create({
            email,
        }).get();

        throw new ApiError(403, 'You can\'t register with this email!')
    } catch (e) {
        if (e.name === 'ApiError') {
            throw e;
        }
    }

    await User.create({
        email,
        password: crypto.createHash('sha512')
            .update(salt + password + salt, 'utf8')
            .digest('hex'),
        username,
        salt,
        email_confirmed: false,
    }).put();

    return {
        statusCode: 201,
        body: {
            message: 'User created!',
        },
    };
});

export const handler = logic
    .use(jsoner)
    .use(validator({inputSchema}))
    .use(apiErrorHandler);
