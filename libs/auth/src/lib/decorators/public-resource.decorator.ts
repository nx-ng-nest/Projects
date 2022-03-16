import { v4 } from 'uuid';

import {
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const PUBLIC_RESOURCE_KEY = `PUBLIC_RESOURCE_KEY_${v4()}`;

export function PublicResource() {
  return SetMetadata(PUBLIC_RESOURCE_KEY, true);
}

export function isPublicResource(
  context: ExecutionContext,
  reflector: Reflector
) {
  return reflector.getAllAndOverride(PUBLIC_RESOURCE_KEY, [
    context.getClass(),
    context.getHandler(),
  ]);
}
