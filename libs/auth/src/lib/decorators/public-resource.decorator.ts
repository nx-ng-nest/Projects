import { v4 } from 'uuid';

import {
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const PUBLIC_RESOURCE_KEY = `PUBLIC_RESOURCE_KEY_${v4()}`;

/**
 * Define the resource as public
 * @returns
 */
export function PublicResource() {
  return SetMetadata(PUBLIC_RESOURCE_KEY, true);
}

/**
 * Check the resource is defined as public
 * @param context
 * @param reflector
 * @returns
 */
export function isPublicResource(
  context: ExecutionContext,
  reflector: Reflector
) {
  return reflector.getAllAndOverride(PUBLIC_RESOURCE_KEY, [
    context.getClass(),
    context.getHandler(),
  ]);
}
