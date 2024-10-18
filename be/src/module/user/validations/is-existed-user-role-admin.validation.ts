import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "../user.service";
import { DEFAULT_ROLE } from "src/module/role/role.entity";
import { NotFoundException } from "@nestjs/common";

export class IsExistedUserAndRoleAdminConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(id: string, validationArguments?: ValidationArguments): Promise<boolean> {
    const user = await this.userService.getUserById(id)

    if(!user) {
      throw new NotFoundException('User không tồn tại')
    }

    if(user && user.role.name === DEFAULT_ROLE.ADMIN) {
      throw new Error('Không thể xóa user admin')
    }

    return true
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    throw new Error("Không thể xóa user");
  }
  
}