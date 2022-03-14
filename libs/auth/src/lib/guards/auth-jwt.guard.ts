import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '@projects/models';

import { PermissionService } from '../permission.service';

@Injectable()
export class AuthJwtGuard extends AuthGuard('jwt') {
  constructor(private readonly permissionService: PermissionService<AuthUser>) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const superResult = await super.canActivate(context);

    if (this.permissionService.isPublic()) {
      return true;
    }
    if (this.permissionService.hasPermission()) {
      return true;
    }

    return superResult as any;
  }
}
