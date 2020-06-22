import contentType from 'content-type';
import {MiddlewareObject} from "../interfaces/ApiMiddleWare";
import {ApiError} from "../interfaces/ApiError";

export const jsoner: MiddlewareObject = {
    before: (handler, next) => {
        if (handler.event.headers) {
            const contentTypeHeader = handler.event.headers['content-type'] || handler.event.headers['Content-Type'];
            if (contentTypeHeader) {
                const { type } = contentType.parse(contentTypeHeader);
                if (type === 'application/json') {
                    try {
                        handler.event.body = JSON.parse(handler.event.body)
                    } catch (err) {
                        throw new ApiError(400, 'Json decode failed')
                    }
                }
            }
        }
        next()
    },
    after: (handler, next) => {
      if (!handler.response.isBase64Encoded) {
          handler.response.body = JSON.stringify(handler.response.body);
      }

      next()
    },
};
