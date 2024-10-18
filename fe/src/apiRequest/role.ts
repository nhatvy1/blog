import { http } from '@/configs/http'
import {
  IFormCreateRole,
  IListRole,
  IResponseCreateRole
} from '@/types/role.type'

export const fetchRoles = () => http.get<null, IListRole>('role')

export const createRole = (data: IFormCreateRole) =>
  http.post<IFormCreateRole, IResponseCreateRole>('role', data)
