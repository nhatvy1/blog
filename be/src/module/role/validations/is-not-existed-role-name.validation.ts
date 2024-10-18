import { ConflictException, Injectable } from '@nestjs/common'
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { RoleService } from '../role.service'

@ValidatorConstraint({ async: true })
@Injectable()
export class IsNotExistedRoleNameConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly roleService: RoleService) {}

  async validate(
    name: string,
    validationArguments?: ValidationArguments
  ): Promise<boolean> {
    const isExistedEmail = await this.roleService.getRoleByName(name)
    if (isExistedEmail) throw new ConflictException('Role đã tồn tại')
    return true
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    throw new Error('Method not implemented.')
  }
}

export function IsNotExistedRoleName(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsNotExistedRoleNameConstraint
    })
  }
}
