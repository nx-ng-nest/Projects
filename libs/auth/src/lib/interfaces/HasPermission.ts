import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export interface HasPermission {
  hasPermission(
    context: ExecutionContext,
    reflector: Reflector
  ): boolean | Promise<boolean>;
}
