import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import {env} from 'node:process'
import {authRouter} from './routes/authRoutes'

export const app = express()
app.use(express.json())

app.use(cors({
  origin: env.NODE_ENV === 'production' ? env.PRODUCTION_ORIGINS : env.LOCAL_ORIGINS
}))

app.get('/', (req: Request, res: Response, next: NextFunction)=>{
  res.send('Oauth2 project')
})

const authRoute = '/v1/api/auth'
app.use(authRoute, authRouter)

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: 'route not found'
  })
})

export default app