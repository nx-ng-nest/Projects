import { v4 } from 'uuid';

import {
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { getUserObject } from './user.decorator';

const REQUIRED_PERMISSION_TOKEN = `REQUIRED_PERMISSION_TOKEN_${v4()}`;

/**
 * Set permission for resouces
 * @param permission
 * @returns
 */
export function SetPermission<P = string>(permission: P) {
  return SetMetadata(REQUIRED_PERMISSION_TOKEN, permission);
}

export function readPermission(resource: string) {
  return `READ:${resource.toUpperCase()}`;
}
export function writePermission(resource: string) {
  return `WRITE:${resource.toUpperCase()}`;
}
export function ReadPermission(resource: string) {
  return SetMetadata(REQUIRED_PERMISSION_TOKEN, readPermission(resource));
}

export function WritePermission(resource: string) {
  return SetMetadata(REQUIRED_PERMISSION_TOKEN, writePermission(resource));
}

/**
 * Check the resource is secured by permission
 * @param context
 * @param reflector
 * @returns
 */
export function getRequiredPermission<P = string>(
  context: ExecutionContext,
  reflector: Reflector
): P {
  return reflector.getAllAndOverride(REQUIRED_PERMISSION_TOKEN, [
    context.getClass(),
    context.getHandler(),
  ]);
}

export function hasPermission(context: ExecutionContext, reflector: Reflector) {
  const requieredPermission = getRequiredPermission(context, reflector);
  const user = getUserObject(context);

  if (requieredPermission) {
    return user.permissions.includes(requieredPermission);
  } else {
    return true;
  }
}
