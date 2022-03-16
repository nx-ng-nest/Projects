import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HasPermission } from '@projects/auth';

export class HasPermissionImp implements HasPermission {
  public hasPermission(
    context: ExecutionContext,
    reflector: Reflector
  ): boolean | Promise<boolean> {
    return true;
  }
}
