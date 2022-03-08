import { SetMetadata } from '@nestjs/common';

import { EntityPermissionField } from './permission';

export const HAS_PERMISSION_KEY = 'HAS_PERMISSION_KEY';

export function HasPermission(permission: EntityPermissionField) {
  return SetMetadata(HAS_PERMISSION_KEY, permission);
}

export function GetPermission(resourceName: string) {
  return HasPermission({
    [resourceName]: {
      get: true,
    },
  });
}

export function PostPermission(resourceName: string) {
  return HasPermission({
    [resourceName]: {
      post: true,
    },
  });
}

export function PatchPermission(resourceName: string) {
  return HasPermission({
    [resourceName]: {
      patch: true,
    },
  });
}

export function DeletePermission(resourceName: string) {
  return HasPermission({
    [resourceName]: {
      delete: true,
    },
  });
}
