import {
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { AuthEnum } from '../auth.enum';
import {
  hasPermission,
  isPublicResource,
} from '../decorators';

export function Secure() {
  return UseGuards(AuthJwtGuard);
}

@Injectable()
export class AuthJwtGuard extends AuthGuard('jwt') {
  private logger = new Logger(AuthJwtGuard.name);
  constructor(
    private readonly reflector: Reflector,
     @Inject(AuthEnum.IS_ACTIVE) private readonly isActive: boolean
  ) {
    super();
  }

  /**
   * 1 - check is public resource
   * 2 - check the user has permission.
   * @param context
   * @returns
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (isPublicResource(context, this.reflector)) {
      return true;
    }
    console.log(this.isActive)

    if (this.isActive == false) {
      return true;
    }
    const result = await super.canActivate(context);

    if (hasPermission(context, this.reflector)) {
      return result as any;
    } else {
      return false;
    }
  }
}
