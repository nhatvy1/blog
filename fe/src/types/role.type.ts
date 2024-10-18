import { Permission } from "@/utils/transform.permission"

export enum ModuleNameEnum {
  ALL = 'all',
  USER = 'user',
  ROLE = 'role'
}

export enum ActionEnum {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete'
}

export interface IRole {
  _id: string
  name: string
  permissions: { [key: string]: string[] }
}

export interface IListRole {
  statusCode: string
  message: string
  result: IRole[]
}

export interface IResponseCreateRole {
  statusCode: string
  message: string
  result: IRole
}
export interface IFormCreateRole {
  name: string
  permissions: Record<string, string[]>
}
