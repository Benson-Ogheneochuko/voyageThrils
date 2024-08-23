import { Request, Response } from "express"

export const upsertUser =(req: Request, res: Response)=>{
  const {userData} = req.body
  res.send(userData)
}