import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './module/user/user.module'
import { RoleModule } from './module/role/role.module'
import { AuthModule } from './module/auth/auth.module'
import { MongooseModule } from '@nestjs/mongoose'
import { KeywordModule } from './module/keyword/keyword.module'

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.MONGO_URI, {
      connectionFactory: (connection) => {
        const mongoLogger = new Logger('DATABASE')
        connection.on('connected', () => {
          mongoLogger.verbose('Connect database successfully')
        })
        connection._events.connected()
        return connection
      }
    }),
    UserModule,
    AuthModule,
    RoleModule,
    KeywordModule
  ],
  controllers: [],
  providers: [{ provide: 'PORT', useValue: 5000 }]
})
export class AppModule {}
