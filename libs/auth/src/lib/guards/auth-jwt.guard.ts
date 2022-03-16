import {
  ExecutionContext,
  Injectable,
  Scope,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import {
  HasPermission,
  IsPublic,
} from '../interfaces';
import { InjectHasPermission } from '../providers/has-permission.provider';
import { InjectIsPublic } from '../providers/is-public.provider';

@Injectable({ scope: Scope.REQUEST })
export class AuthJwtGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    @InjectIsPublic() private readonly isPublicService: IsPublic,
    @InjectHasPermission() private readonly hasPermissionService: HasPermission
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const superResult = (await super.canActivate(context)) as any;

    if (await this.isPublicService.isPublic(context, this.reflector)) {
      return true;
    }

    if (
      await this.hasPermissionService.hasPermission(context, this.reflector)
    ) {
      return true;
    }

    return superResult;
  }
}
