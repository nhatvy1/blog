import {
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './user.entity'
import { Model } from 'mongoose'
import { RegisterDto } from '../auth/dto/register.dto'
import { LoginDto } from '../auth/dto/login.dto'
import { RoleService } from '../role/role.service'
import { Hash } from 'src/utils/hash'
import { DEFAULT_ROLE } from '../role/role.entity'
import { SearchUserDto } from './dto/search.user.dto'
import { CreateUserDto } from './dto/create.user.dto'
import { UpdateUserDto } from './dto/update.user.dto'

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly roleService: RoleService
  ) {}

  async onModuleInit() {
    const checkEmail = await this.userModel.findOne({
      email: 'admin@gmail.com'
    })
    await this.roleService.initRole()
    if (!checkEmail) {
      const role = await this.roleService.getRoleByName(DEFAULT_ROLE.ADMIN)
      const userAdmin = await this.userModel.create({
        fullName: 'Super Admin',
        email: 'admin@gmail.com',
        password: Hash.generateHash('1'),
        role: role
      })
    }
  }

  async register(createUser: RegisterDto) {
    const hassPassword = Hash.generateHash(createUser.password)
    const role = await this.roleService.getRoleByName(DEFAULT_ROLE.CUSTOMER)
    const user = await this.userModel.create({
      ...createUser,
      password: hassPassword,
      role: role
    })
    return user
  }

  async createUser(createUser: CreateUserDto) {
    const hassPassword = Hash.generateHash(createUser.password)
    const role = await this.roleService.getRoleByName(DEFAULT_ROLE.CUSTOMER)
    const user = await this.userModel.create({
      ...createUser,
      password: hassPassword,
      role: role
    })
    return user
  }

  async login(loginDto: LoginDto) {
    try {
      const checkUser = await this.userModel
        .findOne({ email: loginDto.email })
        .populate({
          path: 'role',
          select: ['name', 'permissions']
        })
        .select(['_id', 'email', 'password', 'fullName'])
        .lean()

      if (!checkUser) {
        throw new NotFoundException('Email hoặc mật khẩu không chính xác')
      }

      const isComparePassword = Hash.compare(
        loginDto.password,
        checkUser.password
      )
      if (!isComparePassword) {
        throw new UnauthorizedException('Email hoặc mật khẩu không chính xác')
      }

      return checkUser
    } catch (e) {
      throw e
    }
  }

  getUserById(id: string) {
    return this.userModel.findOne({ _id: id }).populate('role')
  }

  async getListUser(query: SearchUserDto) {
    const { limit = 10, page = 1, search = '', role = '' }: any = query

    let searchQuery: any = {}

    if (search) {
      searchQuery['$or'] = [
        {
          fullName: {
            $regex: `.*${search}.*`,
            $options: 'i'
          }
        },
        {
          email: {
            $regex: `.*${search}.*`,
            $options: 'i'
          }
        }
      ]
    }
    const skip = limit * page - limit
    const data = await this.userModel
      .find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'role',
        select: ['_id', 'name']
      })
    const count = await this.userModel.countDocuments(searchQuery)
    const totalPage = Math.ceil(count / limit)

    return { data, count, totalPage, limit, page }
  }

  checkEmail(email: string) {
    return this.userModel.findOne({ email })
  }

  async updateUser(id: string, updateUser: UpdateUserDto) {
    return await this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: updateUser },
      { new: true }
    )
  }

  deleteUserById(id: string) {
    return this.userModel.findOneAndDelete({ _id: id })
  }
}
