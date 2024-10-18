import { Body, Controller, Get, Post } from '@nestjs/common'
import { KeywordService } from './keyword.service'
import { CreateKeywordDto } from './dto/create.keyword.dto'
import { ResponseMessage } from 'src/decorators/response.message.decorator'

@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Get('')
  async openPage() {
    return this.keywordService.openPage()
  }

  @Post('')
  @ResponseMessage('Tạo nhiệm vụ thành công')
  addKeyword(@Body() createKeyword: CreateKeywordDto) {
    // return this.keywordService.addKeyword()
    return { user: 1 }
  }
}
