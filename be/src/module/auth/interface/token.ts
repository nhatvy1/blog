
export interface Tokens {
  access_token: string
  refresh_token: string
}

export interface TokenVerify {
  userId: number
  role: string
  iat: number
  exp: number
  refreshToken: string
}
