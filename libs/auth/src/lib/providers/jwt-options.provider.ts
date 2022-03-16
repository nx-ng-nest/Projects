import { v4 } from 'uuid';

import {
  Inject,
  Provider,
} from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';

const JWT_OPTIONS_TOKEN = `JWT_OPTIONS_TOKEN_${v4()}`;

export function provideJwtModuleOptions(options: JwtModuleOptions): Provider {
  return {
    provide: JWT_OPTIONS_TOKEN,
    useValue: options,
  };
}

export function InjectJwtOptions() {
  return Inject(JWT_OPTIONS_TOKEN);
}
