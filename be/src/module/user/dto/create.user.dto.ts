import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength
} from 'class-validator'
import { IsNotExistedEmail } from '../validations/is-not-existed-email.validation'

export class CreateUserDto {
  @MaxLength(100, { message: 'Vui lòng nhập ít hơn 100 kí tự' })
  @MinLength(5, { message: 'Vui lòng nhập ít nhất 5 kí tự' })
  @IsNotEmpty({ message: 'Vui lòng nhập ho và tên' })
  fullName: string

  @IsNotExistedEmail()
  @IsEmail({}, { message: 'Vui lòng đúng định dạng email' })
  @IsNotEmpty({ message: 'Vui lòng nhập email' })
  email: string

  @MaxLength(20, { message: 'Vui lòng nhập ít hơn 100 kí tự' })
  @MinLength(1, { message: 'Vui lòng nhập ít nhất 5 kí tự' })
  @IsNotEmpty({ message: 'Vui lòng nhập mật khẩu' })
  password: string
}