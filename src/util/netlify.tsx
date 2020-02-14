import * as React from 'react'
// @ts-ignore
import * as netlify from 'netlify-auth-providers'

const authenticator = new netlify.default ({});

export const login = (e: Event) => {
    e.preventDefault();

    return new Promise((resolve, reject) => {
        authenticator.authenticate({provider:"github", scope: "user"}, (err: any, data: any) => {
            console.log(err, data);
            err ? reject(err) : resolve(data);
        })
    });
};