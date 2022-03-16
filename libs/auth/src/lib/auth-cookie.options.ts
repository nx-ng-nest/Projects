import { CookieOptions as CO } from 'express';

export const CookieOptions: CO = Object.freeze({
  httpOnly: true,
  maxAge: 1000 * 60 * 24 * 30,
});
