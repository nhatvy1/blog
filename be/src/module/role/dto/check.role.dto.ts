import { IsNotEmpty } from "class-validator";
import { IsExistedRole } from "../validations/is-existed-role.validation";

export class CheckRoleDto {
  @IsNotEmpty()
  @IsExistedRole()
  id: string
}