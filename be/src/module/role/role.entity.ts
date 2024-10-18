import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Types } from 'mongoose'
export type RoleDocument = HydratedDocument<Role>

export const DEFAULT_ROLE = {
  CUSTOMER: 'customer',
  ADMIN: 'admin'
}

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

@Schema({ timestamps: true })
export class Role {
  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: Map, of: [String], enum: ActionEnum, default: {} })
  permissions: Map<ModuleNameEnum, ActionEnum[]>
}

export const RoleSchema = SchemaFactory.createForClass(Role)
