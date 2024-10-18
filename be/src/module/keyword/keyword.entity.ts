import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: true })
export class Keyword {
  @Prop({ type: String, required: true })
  keyword: string

  @Prop({ type: String, required: true })
  domain: string
}

export const KeywordSchema = SchemaFactory.createForClass(Keyword)
