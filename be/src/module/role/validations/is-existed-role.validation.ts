import { Injectable, NotFoundException } from '@nestjs/common'
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
export class IsExistedRoleConstraint implements ValidatorConstraintInterface {
  constructor(private readonly roleService: RoleService) {}

  async validate(
    id: string,
    validationArguments?: ValidationArguments
  ): Promise<boolean> {
    const role = await this.roleService.getRoleById(id)
    if (!role) throw new NotFoundException('Role không tồn tại')

    return true
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    throw new Error('Vui lòng thử lại sau')
  }
}

export function IsExistedRole(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsExistedRoleConstraint
    })
  }
}
