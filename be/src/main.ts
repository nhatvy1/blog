import { NestFactory, Reflector } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { TransformInterceptor } from './transforms/transform.interceptor'
import { AllExceptionsFilter } from './interceptors/all-exception.filter'
import { useContainer } from 'class-validator'
import { AppModule } from './app.module'

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    credentials: true
  })

  const reflector = app.get(Reflector)

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.setGlobalPrefix('api')

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
  app.useGlobalInterceptors(new TransformInterceptor(reflector))
  app.useGlobalFilters(new AllExceptionsFilter())

  const PORT = app.get('PORT') || 8080
  await app.listen(PORT, () => console.log(`App is running on port ${PORT}`))

  if (module.hot) {  
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap()
