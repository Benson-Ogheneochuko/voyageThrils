import { NextFunction, Request, Response } from "express";

type AsyncRunc = (req: Request, res: Response, next?: NextFunction) => Promise<void>

export const asyncReqWrapper = (func: AsyncRunc) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res)).catch(next);
  }
}