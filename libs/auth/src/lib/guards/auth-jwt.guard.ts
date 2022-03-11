import { Request } from 'express';

import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { getUserObject } from '@projects/utils';

import {
  getRequiredPermission,
  isPublicResource,
} from '../decorator';
import { User } from '../user';

@Injectable()
export class AuthJwtGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    console.log((req as any).user);

    const resourceName = req.params['resourceName']?.toUpperCase();
    const method = req.method.toUpperCase();

    console.log(req.params);
    const isPublic = isPublicResource(context, this.reflector);
    if (isPublic) {
      return true;
    }
    const superResult = await super.canActivate(context);

    const user = getUserObject(context) as User;
    const rpermits = getRequiredPermission(context, this.reflector);

    if (rpermits) {
      if (!user.permissions[rpermits.resource]) {
        return false;
      }
      if (!user.permissions[rpermits.resource][rpermits.method]) {
        return false;
      }
    }

    return superResult as any;
  }
}
