import { Request, Response, NextFunction } from "express"
import { getGoogleOauthUrl, getGoogleTokens } from "./GoogleAuthService"
import { verifyJwtToken, Clients } from "../authUtils/verifyJwt"

export const GoogleAuthController = async (req: Request, res: Response) =>{
  try {
    const consentUrl = getGoogleOauthUrl()

    if(!consentUrl) {
      return console.error('google sign-in error: ', consentUrl)
    }

    return res.redirect(consentUrl)
  } catch (error) {
    console.log(error)
  }
}

export const GoogleUserController = async (req: Request, res: Response, next: NextFunction) => {
  const { code, state } = req.query
  try {
    if(!state){
      return res.status(400).send('Invalid state parameter');
    }
    const { id_token, access_token } = await getGoogleTokens(code as string)
    if (!id_token || !access_token) {
      throw new Error('Google access errors')
    }

    const data = verifyJwtToken({ token: id_token, client: Clients.google })
    if(!data) {
      throw new Error('Error fetching user data')
    }

    req.body.data = data
    next()
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: 'Authentication failed' })
  }
}