import {
    attribute,
    hashKey,
    table,
} from '@aws/dynamodb-data-mapper-annotations';
import {Base} from "./base";

@table(process.env.USERS as string)
export class User extends Base {
    @hashKey()
    email: string;

    @attribute()
    email_confirmed: boolean;

    @attribute()
    password: string;

    @attribute()
    salt: string;
}
