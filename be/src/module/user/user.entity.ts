import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { Role, RoleDocument } from '../role/role.entity'

export type UserDocument = HydratedDocument<User>

export enum StatusEnum {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PENDING = 'pending'
}

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  fullName: string

  @Prop({ type: String, required: true })
  email: string

  @Prop({ type: String, select: false, required: true })
  password: string

  @Prop({ type: String, require: true, default: '' })
  avatar: string

  @Prop({ type: String, enum: StatusEnum, default: StatusEnum.APPROVED })
  status: string

  @Prop({ type: Types.ObjectId, ref: Role.name })
  role: RoleDocument
}

export const UserSchema = SchemaFactory.createForClass(User)