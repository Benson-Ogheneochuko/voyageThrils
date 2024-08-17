export class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.isOperational = false;
        this.success = false;
        this.name = this.constructor.name;
        this.isOperational = true;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
export class BadRequest extends AppError {
    constructor(message) {
        super(400, message);
    }
}
export class ResourceNotFound extends AppError {
    constructor(message) {
        super(404, message);
    }
}
export class InvalidInput extends AppError {
    constructor(message) {
        super(422, message);
    }
}
export class Expired extends AppError {
    constructor(message) {
        super(410, message);
    }
}
export class ServerError extends AppError {
    constructor(message) {
        super(500, message);
    }
}
