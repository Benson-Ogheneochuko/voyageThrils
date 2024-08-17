import {Request, Response, NextFunction} from 'express'
import { supportedCodesService } from "../services/supportedCodesService"
import { asyncErrorHandler } from "../handleErrors/AppErrorHandlers"

export const supportedCodesController = asyncErrorHandler(
  async ( req: Request, res: Response, next: NextFunction ): Promise<Response<any> | undefined> => {

  	const codes = await supportedCodesService()
  	if (!codes) {
  		return res.status(400).json({
  			success: false, message: 'error fetching supported codes. try again later'
  		})
  	}

  	res.status(200).json({
  		success: true,
  		message: 'request successful',
  		data: codes
  	})
  }
)