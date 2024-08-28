import { Request, Response } from "express"
import { IUser, User } from "../dbModules/fireStore/models/userModel"
import { AppError } from "@/utils/appErrors"
import { asyncReqWrapper } from "@/utils/asyncWrapper"

// Todo:: improve the delete method
export class UserHandler {
  public static instance: UserHandler
  private userModel: User

  constructor() {
    this.userModel = User.getInstance()
  }

  public static getInstance(): UserHandler {
    if(!UserHandler.instance) {
      UserHandler.instance = new UserHandler()
    }

    return UserHandler.instance
  }

  private isValidUserData(userData: Partial<IUser>): boolean {
    // Add more specific validations as needed
    return !!(userData.email)
  }

  public createUser = asyncReqWrapper(async (req: Request, res: Response): Promise<void> => {
    const { userData }: {userData: IUser} = req.body
    if (!userData || !userData['email']) {
      throw new AppError({
        userMessage: 'Invalid user data provided',
        code: 'Invalid details',
        status: 400,
        operation: 'Create User',
      })
    }

    const user = await this.userModel.createUser(userData)
    if (!user) {
      throw new AppError({
        userMessage: 'Error creating user, try again later',
        code: 'create fail',
        status: 401,
        operation: 'Create User'
      })
    }

    res.status(201).json({
      success: true,
      data: user
    })
  })

  public updateUser = asyncReqWrapper(async (req: Request, res: Response): Promise<void> => {
    const { userId, ...userData }: Partial<IUser> = req.body
    if (!userId) {
      res.status(400).json({
        success: false,
        message: 'Invalid handler user data provided'
      })
      return
    }

    const updatedUser = await this.userModel.updateUser(userId, userData)
    if (!updatedUser) {
      res.status(400).json({
        success: false,
        message: 'Error updating user, try again later'
      })
      return
    }

    res.status(200).json({
      success: true,
      data: updatedUser
    })
  })

  public getUser = asyncReqWrapper(async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params
    const { email } = req.body

    if (!userId && !email) {
      res.status(400).json({
        success: false,
        message: 'User ID or email is required'
      })
      return
    }

    const user = userId ? await this.userModel.getUser(userId) : await this.userModel.getUserByEmail(email)
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      })
      return
    }

    res.status(200).json({
      success: true,
      data: user
    })
  })

  public deleteUser = asyncReqWrapper(async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params
    const { email } = req.params

    if (!userId && !email) {
      res.status(400).json({
        success: false,
        message: 'User Id required'
      })
    }
    userId ? await this.userModel.deleteUser(userId) : await this.userModel.deleteUserByEmail(email)
    res.status(200).json({
      success: true,
      message: 'delete user successful'
    })
  })
}