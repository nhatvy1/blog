import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { RoleService } from './role.service'
import { CreateRoleDto } from './dto/create.role.dto'
import { ResponseMessage } from 'src/decorators/response.message.decorator'
import { Authentication } from 'src/decorators/authentication.decorator'
import { CheckRoleDto } from './dto/check.role.dto'
import { Authorization } from 'src/decorators/authorization.decorator'
import { ActionEnum, ModuleNameEnum } from './role.entity'
import { UpdateRoleDto } from './dto/update.role.dto'

@Controller('role')
@Authentication()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('')
  @Authorization(ModuleNameEnum.ROLE, ActionEnum.CREATE)
  @ResponseMessage('Tạo mới role thành công')
  createRole(@Body() createRole: CreateRoleDto) {
    return this.roleService.createRole(createRole)
  }

  @Get(':id')
  @Authorization(ModuleNameEnum.ROLE, ActionEnum.READ)
  @ResponseMessage('Lấy role thành công')
  getRoleById(@Param() role: CheckRoleDto) {
    return this.roleService.getRoleById(role.id)
  }

  @Put(':id')
  @Authorization(ModuleNameEnum.ROLE, ActionEnum.UPDATE)
  @ResponseMessage('Cập nhật role thành công')
  updateRole(@Param() role: CheckRoleDto, @Body() updateRole: UpdateRoleDto) {
    return this.roleService.updateRole(role.id, updateRole)
  }

  @Get()
  @Authorization(ModuleNameEnum.ROLE, ActionEnum.READ)
  @ResponseMessage('Lấy danh sách role thành công')
  getRole() {
    return this.roleService.getListRoles()
  }

  @Delete(':id')
  @Authorization(ModuleNameEnum.ROLE, ActionEnum.DELETE)
  @ResponseMessage('Xóa role thành công')
  deleteRoleId(@Param() role: CheckRoleDto) {
    return this.roleService.deleteRoleById(role.id)
  }
}
