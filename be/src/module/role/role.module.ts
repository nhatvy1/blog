import { Module } from '@nestjs/common'
import { RoleService } from './role.service'
import { RoleController } from './role.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Role, RoleSchema } from './role.entity'
import { IsNotExistedRoleNameConstraint } from './validations/is-not-existed-role-name.validation'
import { IsExistedRoleConstraint } from './validations/is-existed-role.validation'
import { ValidateEnumRoleConstraint } from './validations/validate-enum-role.validation'
import { IsJsonObjectConstraint } from './validations/is-json-object.validation'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])
  ],
  controllers: [RoleController],
  providers: [
    RoleService,
    IsNotExistedRoleNameConstraint,
    IsExistedRoleConstraint,
    ValidateEnumRoleConstraint,
    IsJsonObjectConstraint
  ],
  exports: [RoleService]
})
export class RoleModule {}
