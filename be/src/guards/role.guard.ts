import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { ActionEnum, ModuleNameEnum } from 'src/module/role/role.entity'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const module = this.reflector.getAllAndOverride<ModuleNameEnum>('module', [
      context.getHandler(),
      context.getClass()
    ])
    const action = this.reflector.getAllAndOverride<ActionEnum>('action', [
      context.getHandler(),
      context.getClass()
    ])
    const { user } = context.switchToHttp().getRequest()
    const { permissions } = user

    if(!action && !module) {
      return true
    }

    let flag = false
    for(const key of Object.keys(permissions)) {
      permissions[key].map((item: any)=> {
        if(item === ActionEnum.MANAGE && key === ModuleNameEnum.ALL) {
          flag = true
        }

        if(item === ActionEnum.MANAGE && key === action) {
          flag =  true
        }

        if(item === action && key === module) {
          flag = true
        }
      })
    }

    if (flag) {
      return true
    }
    
    throw new ForbiddenException(`Bạn không có quyền truy cập`)
  }
}
