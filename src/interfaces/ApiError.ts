export class ApiError extends Error {
    statusCode: number;
    details?: any;

    constructor(statusCode: number, message: string) {
        super(message);

        this.statusCode = statusCode;
        this.name = 'ApiError';
    }
}
