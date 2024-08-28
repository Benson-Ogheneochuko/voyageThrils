import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import {env} from 'node:process'
import appRouter from './appRoutes'
import { AppError, appErrorHandler } from './utils/appErrors'

export const app = express()
app.use(express.json())

app.use(cors({
  origin: env.NODE_ENV === 'production' ? env.PRODUCTION_ORIGINS : env.LOCAL_ORIGINS
}))

app.get('/', (req: Request, res: Response, next: NextFunction)=>{
  res.send('Oauth2 project')
})

const apiEndpoint = '/v1/api'
app.use(apiEndpoint, appRouter)

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: 'route not found'
  })
})

app.use((err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
  const error = appErrorHandler(err)
  res.status(error.status).json(error.body)
});
export default app