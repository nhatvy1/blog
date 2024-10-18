import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './user.entity'
import { RoleModule } from '../role/role.module'
import { IsExistedUserConstraint } from './validations/is-existed-user.validation'
import { IsNotExistedEmailConstraint } from './validations/is-not-existed-email.validation'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RoleModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    IsNotExistedEmailConstraint,
    IsExistedUserConstraint
  ],
  exports: [UserService, IsNotExistedEmailConstraint, IsExistedUserConstraint]
})
export class UserModule {}
