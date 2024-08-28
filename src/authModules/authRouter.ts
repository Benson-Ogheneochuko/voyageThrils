import { Router } from "express";
import { GoogleAuthController, GoogleUserController, RerouteRequestController } from ".";

export const authRoute = '/auth'
export const authRouter = Router()

authRouter
  .route('/googleAuth')
  .get(GoogleAuthController)

authRouter
  .route('/googleAuth/verifyToken')
  .get(GoogleUserController, RerouteRequestController)

authRouter
  .route('/amazon')
  .post()

authRouter
  .route('/ios')
  .post()

authRouter
  .route('/email')
  .post()

export default authRouter