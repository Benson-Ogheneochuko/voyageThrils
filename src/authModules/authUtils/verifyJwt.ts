import jwt from 'jsonwebtoken'
import {env} from 'node:process'

const {GOOGLE_CLIENT_SECRET} = env

export enum Clients {
  google = 'google'
}

const clientSecrets: Record<Clients, string> = {
  [Clients.google]: GOOGLE_CLIENT_SECRET as string
}

interface VerifyToken {
  token: string
  client: Clients
}

export const verifyJwtToken = ({ token, client }: VerifyToken) => {
  if (!(client in clientSecrets)) {
    throw new Error(`Unsupported client: ${client}`)
  }

  try {
    const data = jwt.decode(token)
    return data
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw ('jwt Error:' + error)
    }
    throw new jwt.JsonWebTokenError('Failed to verify token')
  }
}