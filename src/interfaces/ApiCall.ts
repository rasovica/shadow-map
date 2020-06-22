import {APIGatewayEvent, APIGatewayProxyResult} from "aws-lambda";
import middy from "@middy/core";

export interface ApiCall<Body = any> extends Omit<APIGatewayEvent, 'body'> {
    body: Body;
}

export interface ApiResponse extends APIGatewayProxyResult {
    body: any;
}

export type ApiHandler<Input> = middy.Middy<ApiCall<Input>, ApiResponse>;
