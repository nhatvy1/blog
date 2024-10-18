import { ConflictException, Injectable } from '@nestjs/common'
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { UserService } from 'src/module/user/user.service'

@ValidatorConstraint({ async: true })
@Injectable()
export class IsExistedUserConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(
    id: string,
    validationArguments?: ValidationArguments
  ): Promise<boolean> {
    const isExistedEmail = await this.userService.getUserById(id)
    if (!isExistedEmail) throw new ConflictException('User không tồn tại')
    return true
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    throw new Error('User không tồn tại')
  }
}

export function IsExistedUser(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsExistedUserConstraint
    })
  }
}
