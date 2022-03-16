import { ClassConstructor } from 'class-transformer';
import { v4 } from 'uuid';

import { Inject } from '@nestjs/common';

import { IsPublic } from '../interfaces';

const IS_PUBLIC_TOKEN = `IS_PUBLIC_TOKEN_${v4()}`;

export function provideIsPublicProvider(
  classConstructor: ClassConstructor<IsPublic>
) {
  return {
    provide: IS_PUBLIC_TOKEN,
    useClass: classConstructor,
  };
}

export function InjectIsPublic() {
  return Inject(IS_PUBLIC_TOKEN);
}
