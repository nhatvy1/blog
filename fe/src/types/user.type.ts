import { IRole } from './role.type'

export interface IUser {
  _id: string
  email: string
  fullName: string
  avatar: string
  createdAt: string
  status: string
  role: IRole
}

export interface IFormAddUser {
  email?: string
  fullName: string
  password?: string
  status: string
  // role: string
}

export interface IFormUpdateUser {
  email: string
  fullName: string
  status: string
  // role: string
}

export interface IResponseListUser {
  statusCode: number
  message: string
  result: {
    data: IUser[]
    totalPage: number
    limit: number
    page: number
    count: number
  }
}

export interface IResponseCreateUser {
  statusCode: number
  message: string
  result: IUser
}

export interface IResponseUpdateUser {
  statusCode: number
  message: string
  result: IUser
}