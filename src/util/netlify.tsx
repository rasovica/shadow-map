import * as React from 'react'
// @ts-ignore
import * as netlify from 'netlify-auth-providers'

const authenticator = new netlify.default ({});

export enum Providers {
    github = "github"
}

export const login = (provider: Providers) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    authenticator.authenticate({provider, scope: "user"}, (err: any, data: any) => {
        console.log(err, data);
    });
};
