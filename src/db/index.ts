import {DataMapper} from '@aws/dynamodb-data-mapper';
import DynamoDB from 'aws-sdk/clients/dynamodb';

export const mapper = new DataMapper({
    client: new DynamoDB()
});
