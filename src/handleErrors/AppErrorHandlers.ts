import { Request, Response, NextFunction } from "express";

type asyncFunction = (req: Request, res: Response, next: NextFunction)=> Promise<any>

export const asyncErrorHandler = (fn: asyncFunction) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const appErrorHandler =(error: any, req: Request, res: Response, next: NextFunction) => {
  error.statusCode = error.statusCode || 500
  error.status = error.status || 'error'

  if(process.env.NODE_ENV == 'development'){
    // devErrors(res, error)
  }
  if(process.env.NODE_ENV == 'production'){
    // if(error.name === 'CastError') error = castErrorHandler(error);
    // if(error.code === 11000) error = duplicateKeyErrorHandler(error);
    // if(error.name === 'ValidationError') error = validationErrorHandler(error);

    // prodErrors(res, error);
  }
}