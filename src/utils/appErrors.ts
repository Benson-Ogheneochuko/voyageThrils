
interface IAppError extends Error {
  operation: string,
  userMessage: string,
  status: number,
  code?: string,
  errorMessage?: string,
}


interface AppErrorParams {
  operation: string;
  userMessage: string;
  status: number;
  code?: string;
  errorMessage?: string;
}

export class AppError extends Error implements IAppError {
  public readonly operation: string;
  public readonly userMessage: string;
  public readonly status: number;
  public readonly code?: string;
  public readonly errorMessage?: string;

  constructor(params: AppErrorParams) {
    super(params.userMessage);
    this.name = this.constructor.name;
    this.operation = params.operation;
    this.userMessage = params.userMessage;
    this.status = params.status;
    this.code = params.code;
    this.errorMessage = params.errorMessage;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

enum ResCodes {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  CONFLICT = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

enum ResMessages {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  CONFLICT = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

export const appErrorHandler = (error: AppError | Error) => {
  // logger.error(`Error ${error.code}: ${error.userMessage}`, {
  if (error instanceof AppError) {
    console.error(`Error ${error.code}: ${error.userMessage}`, {
      errorMessage: error.errorMessage,
      stack: error.stack
    });

    return {
      status: error.status,
      body: {
        message: error.userMessage,
        code: error.code
      }
    }
  } else {
    // logger.error(`Error ${error.code}: ${error.userMessage}`, {
    console.error(`Error: ${error.name}`, {
      errorMessage: error.message,
      stack: error.stack
    });

    return {
      status: 500,
      body: {
        message: 'An Unknown Error Occurred',
        code: 'Unknown Error'
      }
    };
  }
}