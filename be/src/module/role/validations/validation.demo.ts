import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { ActionEnum, ModuleNameEnum } from '../role.entity'
import { Injectable, NotFoundException } from '@nestjs/common'

@ValidatorConstraint()
@Injectable()
export class FirstConstraint
  implements ValidatorConstraintInterface
{
  validate(
    name: string,
    validationArguments?: ValidationArguments
  ): boolean {
    console.log('First')
    return true
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    throw new Error('Method not implemented.')
  }
}

export function First(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: FirstConstraint
    })
  }
}

@ValidatorConstraint()
@Injectable()
export class SecondConstraint
  implements ValidatorConstraintInterface
{
  validate(
    name: string,
    validationArguments?: ValidationArguments
  ): boolean {
    console.log('Second')
    return true
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    throw new Error('Method not implemented.')
  }
}

export function Second(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: SecondConstraint
    })
  }
}

