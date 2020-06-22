import {
    attribute,
    hashKey,
    table,
} from '@aws/dynamodb-data-mapper-annotations';
import {Base} from "./base";

@table(process.env.APIKEYS as string)
export class ApiKey extends Base<ApiKey> {
    @hashKey()
    key: string;

    @attribute()
    email: string;

    @attribute()
    expires: number;
}

