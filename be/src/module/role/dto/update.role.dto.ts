import { IsNotEmpty } from 'class-validator'
import { ValidateEnumRole } from '../validations/validate-enum-role.validation'
import { IsJsonObject } from '../validations/is-json-object.validation'

export class UpdateRoleDto {
  @ValidateEnumRole()
  @IsJsonObject()
  @IsNotEmpty()
  permissions: { [key: string]: string[] }
}
