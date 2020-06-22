import middy from "@middy/core";
import validator from "@middy/validator";
import crypto from "crypto";

import {ApiHandler} from "../interfaces/ApiCall";
import {User} from "../db/objects/user";
import {apiErrorHandler} from "../middleware/errorHandler";
import {jsoner} from "../middleware/jsoner";
import {ApiError} from "../interfaces/ApiError";
import {randomString} from "../util/security";
import {ApiKey} from "../db/objects/api-key";


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
    password: string;
}

const logic: ApiHandler<Input> = middy(async (event) => {
    const {email, password} = event.body;

    try {
        const user = await User.create({
            email,
        }).get();

        if (crypto.createHash('sha512').update(user.salt + password + user.salt, 'utf8').digest('hex') != user.password) {
            throw new ApiError(403, 'The provided info doesn\'t match!');
        }

        const key = randomString(128);

        await ApiKey.create({
            key,
            email,
            expires: Date.now() + 1000 * 60 * 60 * 24,
        }).put();

        return {
            statusCode: 201,
            body: {
                token: key,
            },
        };
    } catch (e) {
        if (e.name !== 'ApiError') {
            throw new ApiError(403, 'The provided info doesn\'t match!')
        }

        throw e;
    }
});

export const handler = logic
    .use(jsoner)
    .use(validator({inputSchema}))
    .use(apiErrorHandler);
