import {
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const PERMISSION_KEY = '879123njiusdf_laksjdfkalu987231n2_jfaso874jkksdf';

export type PermissionMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'HEAD';

export interface PermissionOptions {
  method: PermissionMethod;
  resource: string;
}

export function Permission(permission: PermissionOptions) {
  return SetMetadata(PERMISSION_KEY, permission);
}

export function getRequiredPermission(
  context: ExecutionContext,
  reflector: Reflector
): PermissionOptions {
  return reflector.getAllAndOverride(PERMISSION_KEY, [
    context.getClass(),
    context.getHandler(),
  ]);
}
