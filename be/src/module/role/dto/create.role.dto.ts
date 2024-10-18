import {
  IsNotEmpty,
} from 'class-validator'
import { IsNotExistedRoleName } from '../validations/is-not-existed-role-name.validation'
import { ValidateEnumRole } from '../validations/validate-enum-role.validation';
import { IsJsonObject } from '../validations/is-json-object.validation';

export class CreateRoleDto {
  @IsNotExistedRoleName()
  @IsNotEmpty({ message: 'Vui lòng nhập tên phân quyền ' })
  name: string

  @ValidateEnumRole()
  @IsJsonObject()
  @IsNotEmpty()
  permissions: { [key: string]: string[] };
}
