export interface JwtPayload {
  userId: string
  role: string
  permissions: { [key: string]: string[] }
}
