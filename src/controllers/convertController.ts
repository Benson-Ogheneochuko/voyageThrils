import { Request, Response, NextFunction } from "express";
import { convertService } from "../services/convertService";
import { asyncErrorHandler } from "../handleErrors/AppErrorHandlers";

export const convertController = asyncErrorHandler(
  async ( req: Request, res: Response, next: NextFunction ): Promise<Response<any> | undefined> => {
    const { base, target } = req.body;
    let result = await convertService({ base, target });

    if (!result) {
      return res.status(500).json({
        success: false,
        message: "error getting conversion rates"
      });
    }

    const { time_last_update_utc, time_next_update_utc, base_code, target_code, conversion_rate } = result;

    const filteredResult = {
      time_last_update_utc,
      time_next_update_utc,
      base_code,
      target_code,
      conversion_rate
    };

    res.status(200).json({
      success: true,
      message: "Request successful",
      data: filteredResult
    });
  }
);
