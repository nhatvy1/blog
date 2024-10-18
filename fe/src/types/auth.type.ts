export interface IUserLogin {
  _id: string
  email: string
  fullName: string
  role: string
  permissions: { [key: string]: string[] }
}

export interface IResLogin {
  message: string
  statusCode: string
  result: {
    user: IUserLogin
    access_token: string
    refresh_token: string
  }
}

export interface IFormLogin {
  email: string
  password: string
}
