import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { AccessTokenStrategy } from 'src/strategies/access.token.strategy'
import { RefreshTokenStrategy } from 'src/strategies/refresh.token.strategy'
import { IsNotExistedEmailConstraint } from '../user/validations/is-not-existed-email.validation'

@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    IsNotExistedEmailConstraint
  ]
})
export class AuthModule {}
