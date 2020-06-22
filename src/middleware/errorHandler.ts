import {MiddlewareObject} from "../interfaces/ApiMiddleWare";

export const apiErrorHandler: MiddlewareObject = {
    onError: (handler, next) => {
        console.error(handler.error);

        if (handler.error.statusCode && handler.error.message) {
            const res: any = {
                error: handler.error.message,
            };

            if (handler.error.details){
                res.details = handler.error.details;
            }

            handler.response = {
                statusCode: handler.error.statusCode,
                body: JSON.stringify(res),
            };

            return next()
        }

        handler.response = {
          statusCode: 500,
          body: JSON.stringify({
              error: handler.error
          })
        };

        return next()
    }
};
