import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './interface/jwt.payload'
import { transformData } from 'src/utils/tranform-permission'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async generateToken({ userId, role, permissions }: JwtPayload) {
    const payload = { userId, role, permissions }
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_JWT_SECRET,
        expiresIn: process.env.REFRESH_JWT_EXPIRES
      })
    ])

    return { access_token: access_token, refresh_token: refresh_token }
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.login(loginDto)
    const { password, ...info } = user

    const { access_token, refresh_token } = await this.generateToken({
      userId: user._id.toString(),
      role: info.role.name,
      permissions: info.role.permissions
    })
    const responseLogin = {
      ...info,
      role: info.role.name,
      permissions: info.role.permissions
    }

    return { access_token, refresh_token, user: responseLogin }
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.register(registerDto)
    const { password, ...info } = user.toObject()
  }

  async refreshToken(tokenVerify: JwtPayload) {
    const { access_token, refresh_token } =
      await this.generateToken(tokenVerify)
    return { access_token, refresh_token }
  }
}
