import {APIGatewayEvent} from "aws-lambda";

export interface ApiCall<Body = any> extends APIGatewayEvent {
    body: Body;
}
