import {env} from 'node:process'
import jwt from 'jsonwebtoken'
const {GOOGLE_AUTH_URI, GOOGLE_OAUTH_REDIRECT_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_TOKEN_URI, GOOGLE_PROFILE_SCOPE} = env

// https://www.googleapis.com/auth/userinfo.email
export const getGoogleOauthUrl = () =>{
  const authOptions = {
    redirect_uri: GOOGLE_OAUTH_REDIRECT_URL as string,
    client_id: GOOGLE_CLIENT_ID as string,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: ['email', 'profile'].join(' ')
  }

  const queryString = new URLSearchParams(authOptions)
  return `${GOOGLE_AUTH_URI}?${queryString.toString()}`
}


export const getGoogleTokens = async (code: string) => {
  try {
    const googleTokenUrl = new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID as string,
      client_secret: GOOGLE_CLIENT_SECRET as string,
      redirect_uri: GOOGLE_OAUTH_REDIRECT_URL as string,
      grant_type: 'authorization_code'
    }).toString()

    const response = await fetch(GOOGLE_TOKEN_URI as string, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: googleTokenUrl
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const googleToken = await response.json()
    return googleToken
  } catch (error) {
    throw error
  }
}