import {Callback, Context} from "aws-lambda";
import {ApiError} from "./ApiError";
import {ApiCall, ApiResponse} from "./ApiCall";

export interface MiddlewareObject<A = ApiCall, T = ApiResponse, C extends Context = Context> {
    before?: MiddlewareFunction<A, T, C>;
    after?: MiddlewareFunction<A, T, C>;
    onError?: MiddlewareFunction<A, T, C>;
}

type MiddlewareFunction<T, R, C extends Context = Context> = (handler: HandlerLambda<T, R, C>, next: NextFunction) => void | Promise<any>;

type NextFunction = (error?: any) => void;

interface HandlerLambda<T = any, V = any, C extends Context = Context> {
    event: T;
    context: C;
    response: V;
    error: ApiError;
    callback: Callback<V>;
}
