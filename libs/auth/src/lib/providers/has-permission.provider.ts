import { ClassConstructor } from 'class-transformer';
import { v4 } from 'uuid';

import { Inject } from '@nestjs/common';

import { HasPermission } from '../interfaces';

const HAS_PERMISSION_TOKEN = `HAS_PERMISSION_TOKEN_${v4()}`;

export function providehasPermission(
  hasPermissionClass: ClassConstructor<HasPermission>
) {
  return {
    provide: HAS_PERMISSION_TOKEN,
    useClass: hasPermissionClass,
  };
}

export function InjectHasPermission() {
  return Inject(HAS_PERMISSION_TOKEN);
}
