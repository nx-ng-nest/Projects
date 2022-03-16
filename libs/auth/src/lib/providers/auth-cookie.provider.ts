import { CookieOptions } from 'express';
import { v4 } from 'uuid';

import {
  Inject,
  Provider,
} from '@nestjs/common';

const AUTH_COOKIE_KEY_TOKEN = `AUTH_COOKIE_KEY_TOKEN_${v4()}`;
const AUTH_COOKIE_OPTIONS_TOKEN = `AUTH_COOKIE_OPTIONS_TOKEN_${v4()}`;

export function InjectAuthCookie() {
  return Inject(AUTH_COOKIE_KEY_TOKEN);
}

export function provideAuthCookieKey(key: string): Provider {
  return {
    provide: AUTH_COOKIE_KEY_TOKEN,
    useValue: key,
  };
}

export function InjectAuthCookieOptions() {
  return Inject(AUTH_COOKIE_KEY_TOKEN);
}

export function provideAuthCookieOptions(options: CookieOptions): Provider {
  return {
    provide: AUTH_COOKIE_OPTIONS_TOKEN,
    useValue: options,
  };
}
