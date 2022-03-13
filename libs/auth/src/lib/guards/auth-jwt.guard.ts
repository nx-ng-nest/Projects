import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PermissionService } from '../permission.service';
import { User } from '../user';

@Injectable()
export class AuthJwtGuard extends AuthGuard('jwt') {
  constructor(private readonly permissionService: PermissionService<User>) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.permissionService.isPublic()) {
      return true;
    }
    this.permissionService.hasPermission();

    const superResult = await super.canActivate(context);

    return superResult as any;
  }
}
