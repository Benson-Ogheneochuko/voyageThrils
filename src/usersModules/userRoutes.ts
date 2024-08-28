import { Router } from "express"
import { UserHandler } from "./userHandlers"

export const userRoute = '/users'
export const userRouter = Router()

const userHandler = UserHandler.getInstance()
userRouter
  .route('/newUser')
  .post(userHandler.createUser)

userRouter
  .route('/update')
  .post(userHandler.updateUser)

// get with id
userRouter
  .route('/getUser/:userId')
  .get(userHandler.getUser)

// get with email
userRouter
  .route('/getUser')
  .post(userHandler.getUser)

// delete with id
userRouter
  .route('/delete/:userId')
  .get(userHandler.deleteUser)

// delete with email
userRouter
  .route('/delete/')
  .post(userHandler.deleteUser)

export default userRouter