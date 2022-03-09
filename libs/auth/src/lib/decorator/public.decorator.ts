import {
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const PUBLIC_KEY = 'j912n3128ysnjdf92834-90287nxcv89f239-2893fsd';

export function Public() {
  return SetMetadata(PUBLIC_KEY, true);
}

export function isPublicResource(
  context: ExecutionContext,
  reflector: Reflector
) {
  return reflector.getAllAndOverride(PUBLIC_KEY, [
    context.getHandler(),
    context.getClass(),
  ]);
}
