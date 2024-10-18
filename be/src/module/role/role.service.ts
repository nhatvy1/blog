import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { DEFAULT_ROLE, Role } from './role.entity'
import { Model } from 'mongoose'
import { CreateRoleDto } from './dto/create.role.dto'
import { UpdateRoleDto } from './dto/update.role.dto'

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<Role>
  ) {}

  async createRole(createRole: CreateRoleDto) {
    return this.roleModel.create(createRole)
  }

  async updateRole(id: string, updateRole: UpdateRoleDto) {
    return this.roleModel.findByIdAndUpdate(id, updateRole, { new: true})
  }

  deleteRoleById(id: string) {
    return this.roleModel.findByIdAndDelete({ _id: id })
  }

  async getRoleByName(name: string) {
    try {
      const role = await this.roleModel.findOne({ name: name })
      return role
    } catch (e) {
      throw e
    }
  }

  getListRoles() {
    return this.roleModel.find()
  }

  async getRoleById(id: string) {
    const role = await this.roleModel.findOne({ _id: id })
    return role
  }

  async initRole() {
    const roleCustomer = await this.roleModel.findOne({
      name: DEFAULT_ROLE.CUSTOMER
    })
    if (!roleCustomer) {
      await this.roleModel.create({ name: DEFAULT_ROLE.CUSTOMER })
    }
    const admin = await this.roleModel.findOne({ name: DEFAULT_ROLE.ADMIN })
    if (!admin) {
      const roleAdmin = await this.roleModel.create({
        name: DEFAULT_ROLE.ADMIN,
        permissions: {
          all: ['manage'] 
        }
      })
    }
  }
}
