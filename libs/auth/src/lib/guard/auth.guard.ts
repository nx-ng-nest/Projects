import { Request } from 'express';

import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { AUTH_COOKIE_NAME } from '../consts';
import { JWTUserDetails } from '../jwt-user-details';
import {
  EntityPermissionField,
  HAS_PERMISSION_KEY,
  PUBLIC_DECORATOR_KEY,
} from '../permission';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    // Cheking public routes
    const isPublic = this.reflector.getAllAndOverride(PUBLIC_DECORATOR_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (isPublic) {
      return true;
    }

    // If the route is not public verify the token
    if (!req.cookies) return false;

    const authToken = req.cookies[AUTH_COOKIE_NAME];

    if (authToken) {
      const userDetails: JWTUserDetails = await this.jwtService.verify(
        authToken
      );

      // Checking permissions
      const requiredPermission: EntityPermissionField =
        this.reflector.getAllAndOverride(HAS_PERMISSION_KEY, [
          context.getClass(),
          context.getHandler(),
        ]);

      /**
       * If the required permission is set to false then act like a public route
       */
      if (requiredPermission == false) {
        return true;
      }

      /**
       * If the user's permisison field is true, it means the user is admin so he can access all the routes.
       */
      if (userDetails.permission == true) {
        return true;
      }

      for (const [resouceName, methods] of Object.entries(requiredPermission)) {
        userDetails.permission[resouceName];
      }

      return false;
    }
    return false;
  }
}
