import { Router } from "express";
import { GoogleAuthController, GoogleUserController } from "../authModules/googleSignIn/GoogleAuthController";
import { upsertUser } from "../dbModules/firebase";
export const authRouter = Router()

authRouter
  .route('/googleAuth')
  .get(GoogleAuthController)

authRouter
  .route('/googleAuth/verifyToken')
  .get(GoogleUserController, upsertUser)
  // .post(GoogleUserController, upsertUser)

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