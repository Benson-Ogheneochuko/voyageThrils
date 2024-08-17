export const asyncErrorHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
export const appErrorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    if (process.env.NODE_ENV == 'development') {
        // devErrors(res, error)
    }
    if (process.env.NODE_ENV == 'production') {
        // if(error.name === 'CastError') error = castErrorHandler(error);
        // if(error.code === 11000) error = duplicateKeyErrorHandler(error);
        // if(error.name === 'ValidationError') error = validationErrorHandler(error);
        // prodErrors(res, error);
    }
};
