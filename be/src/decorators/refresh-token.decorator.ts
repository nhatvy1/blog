import { applyDecorators, UseGuards } from "@nestjs/common";
import { JwtRefreshGuard } from "src/guards/jwt.refresh.auth.guard";

export function RefreshToken() {
  return applyDecorators(UseGuards(JwtRefreshGuard))
}