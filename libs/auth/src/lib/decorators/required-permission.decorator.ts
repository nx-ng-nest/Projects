import { v4 } from 'uuid';

import {
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const REQUIRED_PERMISSION_TOKEN = `REQUIRED_PERMISSION_TOKEN_${v4()}`;

export function SetPermission<P = string>(permission: P) {
  return SetMetadata(REQUIRED_PERMISSION_TOKEN, permission);
}

export function getRequiredPermission<P = string>(
  context: ExecutionContext,
  reflector: Reflector
): P {
  return reflector.getAllAndOverride(REQUIRED_PERMISSION_TOKEN, [
    context.getClass(),
    context.getHandler(),
  ]);
}
