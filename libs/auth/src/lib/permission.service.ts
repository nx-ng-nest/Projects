import {
  applyDecorators,
  ExecutionContext,
  Injectable,
  Scope,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PermissionType } from './permission-type.enum';

interface IUserPermission {
  permissions: string[];
}

@Injectable({ scope: Scope.REQUEST })
export class PermissionService<User extends IUserPermission> {
  private static readonly RESOURCE_NAME_KEY =
    'PermissionService_RESOURCENAME_KEY';
  private static readonly PERMISSION_TYPE_KEY =
    'PermissionService_PERMISSION_TYPE_KEY';

  private static readonly PUBLIC_KEY = 'PermissionService_PUBLIC_KEY';

  constructor(
    private context: ExecutionContext,
    private reflector: Reflector
  ) {}

  static createPermission(
    permissionType: PermissionType,
    resourceName: string
  ) {
    return `${permissionType}:${resourceName}`.toUpperCase();
  }

  static ResourceName(resourceName: string) {
    return SetMetadata(this.RESOURCE_NAME_KEY, resourceName.toUpperCase());
  }

  static PermissionType(permissionType: PermissionType) {
    return SetMetadata(this.RESOURCE_NAME_KEY, permissionType.toUpperCase());
  }

  static Public() {
    return SetMetadata(this.PUBLIC_KEY, true);
  }

  static Permission(permissionType: PermissionType, resourceName: string) {
    return applyDecorators(
      this.ResourceName(resourceName),
      this.PermissionType(permissionType)
    );
  }

  private getMetaValue(key: string) {
    return this.reflector.getAllAndOverride(key, [
      this.context.getClass(),
      this.context.getHandler(),
    ]);
  }

  resourceName() {
    return this.getMetaValue(PermissionService.RESOURCE_NAME_KEY);
  }

  permissionType() {
    return this.getMetaValue(PermissionService.PERMISSION_TYPE_KEY);
  }

  isPublic() {
    return this.getMetaValue(PermissionService.PUBLIC_KEY);
  }

  user(): User {
    return this.context.switchToHttp().getRequest().user;
  }

  permission() {
    return `${this.permissionType()}:${this.resourceName()}`;
  }

  hasPermission() {
    const user = this.user();
    if (this.permission() in user.permissions) {
      return;
    }
    throw new UnauthorizedException();
  }
}
