
export class AppError extends Error{
  private isOperational: boolean = false
  protected statusCode: number
  success: Boolean = false

  constructor( statusCode: number, message: string){
    super(message)
    this.name= this.constructor.name
    this.isOperational = true
    this.statusCode= statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export class BadRequest extends AppError{
  constructor(message: string){
    super(400, message)
  }
}

export class ResourceNotFound extends AppError{
  constructor(message: string){
    super(404, message)
  }
}

export class InvalidInput extends AppError {
  constructor(message: string) {
    super(422, message);
  }
}

export class Expired extends AppError {
  constructor(message: string) {
    super(410, message);
  }
}

export class ServerError extends AppError {
  constructor(message: string) {
    super(500, message);
  }
}