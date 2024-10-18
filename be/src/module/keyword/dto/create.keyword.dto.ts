import { IsNotEmpty, IsString } from "class-validator";
import { TrimAllSpaces } from "src/utils/trim-all.spaces";

export class CreateKeywordDto {
  @TrimAllSpaces()
  @IsString()
  @IsNotEmpty()
  keyword: string

  @IsString()
  @IsNotEmpty()
  domain: string
}