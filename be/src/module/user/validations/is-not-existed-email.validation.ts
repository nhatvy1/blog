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
export class IsNotExistedEmailConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UserService) {}

  async validate(
    email: string,
    validationArguments?: ValidationArguments
  ): Promise<boolean> {
    const isExistedEmail = await this.userService.checkEmail(email)
    if (isExistedEmail) throw new ConflictException('Email đã tồn tại')
    return true
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    throw new Error('Method not implemented.')
  }
}

export function IsNotExistedEmail(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsNotExistedEmailConstraint,
    });
  };
}
