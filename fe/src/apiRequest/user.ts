import { http } from '@/configs/http'
import {
  IFormAddUser,
  IFormUpdateUser,
  IResponseCreateUser,
  IResponseListUser,
  IResponseUpdateUser
} from '@/types/user.type'

export const fetchUsers = async (filter: string) =>
  http.get<null, IResponseListUser>(`user?${filter}`)

export const createUser = async (data: IFormAddUser) =>
  http.post<IFormAddUser, IResponseCreateUser>('user', data)

export const updateUser = async (id: string = '', data: IFormUpdateUser) =>
  http.put<IFormUpdateUser, IResponseUpdateUser>(`user/${id}`, data)
