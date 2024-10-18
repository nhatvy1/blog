import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt.auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { ActionEnum, ModuleNameEnum } from "src/module/role/role.entity";

export function Authorization(module: ModuleNameEnum, action: ActionEnum) {
  return applyDecorators(
    SetMetadata('module', module),
    SetMetadata('action', action),
    UseGuards(JwtAuthGuard, RoleGuard)
  )
}