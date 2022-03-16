import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export interface IsPublic {
  isPublic(
    context: ExecutionContext,
    reflector: Reflector
  ): boolean | Promise<boolean>;
}
