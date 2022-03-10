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
    const isPublic = isPublicResource(context, this.reflector);
    if (isPublic) {
      return true;
    }
    const superResult = await super.canActivate(context);

    const user = getUserObject(context) as User;
    const rpermits = getRequiredPermission(context, this.reflector);
    console.log(user, rpermits);

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
