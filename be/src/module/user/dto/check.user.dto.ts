import { IsNotEmpty } from "class-validator";
import { IsExistedUser } from "../validations/is-existed-user.validation";

export class CheckUserDto {
  @IsExistedUser()
  @IsNotEmpty()
  id: string
}