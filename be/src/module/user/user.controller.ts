import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common'
import { UserService } from './user.service'
import { Authentication } from 'src/decorators/authentication.decorator'
import { ReqUser } from 'src/decorators/user.decorator'
import { JwtPayload } from '../auth/interface/jwt.payload'
import { ResponseMessage } from 'src/decorators/response.message.decorator'
import { CheckUserDto } from './dto/check.user.dto'
import { SearchUserDto } from './dto/search.user.dto'
import { CreateUserDto } from './dto/create.user.dto'
import { UpdateUserDto } from './dto/update.user.dto'

@Controller('user')
// @Authentication()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ResponseMessage('Lấy dữ liệu thành công')
  async getUserById(@Param() user: CheckUserDto) {
    return this.userService.getUserById(user.id)
  }

  @Get('')
  @ResponseMessage('Lấy dữ liệu thành công')
  getListUser(@Query() query: SearchUserDto) {
    return this.userService.getListUser(query)
  }

  @Get('profile')
  @ResponseMessage('Lấy dữ liệu thành công')
  async getProfile(@ReqUser() reqUser: JwtPayload) {
    return this.userService.getUserById(reqUser.userId)
  }

  @Put(':id')
  @ResponseMessage('Cập nhật user thành công')
  updateUserById(
    @Param() user: CheckUserDto,
    @Body() updateUser: UpdateUserDto
  ) {
    return this.userService.updateUser(user.id, updateUser)
  }

  @Delete(':id')
  @ResponseMessage('Xóa user thành công')
  deleteUser(@Param() user: any) {
    return this.userService.deleteUserById(user.id)
  }

  @Post('')
  @ResponseMessage('Thêm user thành công')
  createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser)
  }
}
