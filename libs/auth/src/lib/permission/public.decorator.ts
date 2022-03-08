import { SetMetadata } from '@nestjs/common';

export const PUBLIC_DECORATOR_KEY = 'PUBLIC_DECORATOR_KEY';

export function Public() {
  return SetMetadata(PUBLIC_DECORATOR_KEY, true);
}
