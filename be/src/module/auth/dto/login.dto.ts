import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginDto {
  @IsNotEmpty({ message: 'Vui lòng nhập email' })
  @IsEmail({}, { message: 'Vui lòng nhập đúng định dạng email' })
  email: string

  @IsNotEmpty({ message: 'Vui lòng nhập mật khẩu' })
  password: string
}