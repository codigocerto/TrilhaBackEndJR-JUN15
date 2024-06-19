import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RoleEnum } from '../../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles';

@Injectable()
export class RolesGuards implements CanActivate {
  constructor(private reflector: Reflector) {
    console.log('RolesGuards.constructor: entered');
    console.log(
      `RolesGuards.constructor: this.reflector = ${JSON.stringify(this.reflector)}`,
    );
  }

  canActivate(context: ExecutionContext): boolean {
    const roles: RoleEnum[] = this.reflector.get(
      ROLES_KEY,
      context.getHandler(),
    );

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return !!roles.find((role: RoleEnum) => role == user.role);
  }
}
