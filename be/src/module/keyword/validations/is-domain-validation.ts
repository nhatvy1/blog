import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint()
export class IsDomainConstraint implements ValidatorConstraintInterface {
  validate(value: string, validationArguments?: ValidationArguments): boolean {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/
    console.log(value)
    const isValidDomain =  typeof value === 'string' && domainRegex.test(value)
    console.log(isValidDomain)
    if(isValidDomain) return true
    return false
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    throw new Error('Domain không hợp lệ')
  }
}

export function IsDomain(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDomainConstraint
    })
  }
}
