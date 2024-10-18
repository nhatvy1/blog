import { Module } from '@nestjs/common'
import { KeywordService } from './keyword.service'
import { KeywordController } from './keyword.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Keyword, KeywordSchema } from './keyword.entity'
import { IsDomainConstraint } from './validations/is-domain-validation'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Keyword.name, schema: KeywordSchema }]),
  ],
  controllers: [KeywordController],
  providers: [KeywordService, IsDomainConstraint]
})
export class KeywordModule {}
