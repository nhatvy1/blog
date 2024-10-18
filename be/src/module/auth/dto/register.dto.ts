import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength
} from 'class-validator'
import { IsNotExistedEmail } from 'src/module/user/validations/is-not-existed-email.validation'

export class RegisterDto {
  @IsNotEmpty({ message: 'Vui lòng nhập ho và tên' })
  @MinLength(5, { message: 'Vui lòng nhập ít nhất 5 kí tự' })
  @MaxLength(100, { message: 'Vui lòng nhập ít hơn 100 kí tự' })
  fullName: string

  @IsNotEmpty({ message: 'Vui lòng nhập email' })
  @IsEmail({}, { message: 'Vui lòng đúng định dạng email' })
  @IsNotExistedEmail()
  email: string

  @IsNotEmpty({ message: 'Vui lòng nhập mật khẩu' })
  @MinLength(1, { message: 'Vui lòng nhập ít nhất 6 kí tự' })
  @MaxLength(20, { message: 'Vui lòng nhập ít hơn 100 kí tự' })
  password: string
}