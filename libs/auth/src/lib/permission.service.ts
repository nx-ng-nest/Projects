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

  /**
   * create a permission string from permissionType and resouceName.
   * @param permissionType
   * @param resourceName
   * @returns
   */
  static createPermission(
    permissionType: PermissionType,
    resourceName: string
  ) {
    return `${permissionType}:${resourceName}`.toUpperCase();
  }

  /**
   * ResourceName decorator that save resource-name meta data.
   * @param resourceName
   * @returns
   */
  static ResourceName(resourceName: string) {
    return SetMetadata(this.RESOURCE_NAME_KEY, resourceName.toUpperCase());
  }

  /**
   * Decorator that saves permission-type meta data.
   * @param permissionType
   * @returns
   */
  static PermissionType(permissionType: PermissionType) {
    return SetMetadata(this.RESOURCE_NAME_KEY, permissionType.toUpperCase());
  }

  /**
   * Decorator that saves public meta data.
   * @returns
   */
  static Public() {
    return SetMetadata(this.PUBLIC_KEY, true);
  }

  /**
   * Permission decorator that saves resouce-name and permission-type meta data.
   * @param permissionType
   * @param resourceName
   * @returns
   */
  static Permission(permissionType: PermissionType, resourceName: string) {
    return applyDecorators(
      this.ResourceName(resourceName),
      this.PermissionType(permissionType)
    );
  }

  /**
   * Get meta data by key
   * @param key
   * @returns
   */
  private getMetaValue(key: string) {
    return this.reflector.getAllAndOverride(key, [
      this.context.getClass(),
      this.context.getHandler(),
    ]);
  }

  /**
   * Get meta data
   * @returns
   */
  resourceName() {
    return this.getMetaValue(PermissionService.RESOURCE_NAME_KEY);
  }

  /**
   * Get meta data
   * @returns
   */
  permissionType() {
    return this.getMetaValue(PermissionService.PERMISSION_TYPE_KEY);
  }
  /**
   * Get meta data
   * @returns
   */

  /**
   * Get meta data
   * @returns
   */
  isPublic() {
    return this.getMetaValue(PermissionService.PUBLIC_KEY);
  }

  /**
   * Get user details
   * @returns
   */
  user(): User {
    return this.context.switchToHttp().getRequest().user;
  }

  /**
   * Required permission-type and resource-name for the route as string.
   * @returns
   */
  permission(): string {
    return `${this.permissionType()}:${this.resourceName()}`;
  }

  /**
   * Check the route requires a permission or not.
   * If requires loop up the permission in user's permission list.
   * If user has the permission return else throw  UnauthorizedException
   * @returns
   */
  hasPermission(): boolean | never {
    const user = this.user();
    if (this.permission()) {
      if (this.permission() in user.permissions) {
        return true;
      }
    } else {
      return true;
    }
    throw new UnauthorizedException();
  }
}
