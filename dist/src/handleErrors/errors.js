// import config from "../config";
class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.success = false;
        this.name = this.constructor.name;
        this.status_code = statusCode;
    }
}
class BadRequest extends HttpError {
    constructor(message) {
        super(400, message);
    }
}
class ResourceNotFound extends HttpError {
    constructor(message) {
        super(404, message);
    }
}
class Unauthorized extends HttpError {
    constructor(message) {
        super(401, message);
    }
}
class Forbidden extends HttpError {
    constructor(message) {
        super(403, message);
    }
}
class Conflict extends HttpError {
    constructor(message) {
        super(409, message);
    }
}
class InvalidInput extends HttpError {
    constructor(message) {
        super(422, message);
    }
}
class Expired extends HttpError {
    constructor(message) {
        super(410, message);
    }
}
class ServerError extends HttpError {
    constructor(message) {
        super(500, message);
    }
}
const routeNotFound = (req, res, next) => {
    const message = `Route not found: ${req.originalUrl}`;
    res.status(404).json({ success: false, status: 404, message });
};
const errorHandler = (err, _req, res, _next) => {
    const { success, status_code, message } = err;
    const cleanedMessage = message.replace(/"/g, "");
    console.log(err);
    // if (config.NODE_ENV === "development") {
    //   // log.error("Error", err)
    // }
    res.status(status_code).json({
        success,
        status_code,
        message: cleanedMessage,
    });
};
export { BadRequest, Conflict, errorHandler, Expired, Forbidden, HttpError, InvalidInput, ResourceNotFound, routeNotFound, ServerError, Unauthorized, };
