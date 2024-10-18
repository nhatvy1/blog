import { Injectable } from '@nestjs/common'
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint()
@Injectable()
export class IsJsonObjectConstraint implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    throw new Error('Permission không đúng định dạng')
  }
}

export function IsJsonObject(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsJsonObjectConstraint
    })
  }
}
