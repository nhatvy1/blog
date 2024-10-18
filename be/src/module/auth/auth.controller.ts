import { Body, Controller, Post} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { ReqUser } from 'src/decorators/user.decorator'
import { JwtPayload } from './interface/jwt.payload'
import { RefreshToken } from 'src/decorators/refresh-token.decorator'
import { ResponseMessage } from 'src/decorators/response.message.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ResponseMessage('Đăng nhập thành công')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @Post('register')
  @ResponseMessage('Đăng ký thành công')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Post('refresh')
  @RefreshToken()
  @ResponseMessage('Refresh token thành công')
  async refreshToken(@ReqUser() reqUser: JwtPayload) {
    return  this.authService.refreshToken(reqUser)
  }
}