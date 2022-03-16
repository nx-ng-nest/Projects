import { Request } from 'express';
import { Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';

import {
  InjectAuthCookie,
  InjectJwtOptions,
} from '../providers';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectAuthCookie() authCookieKey: string,
    @InjectJwtOptions() jwtOptions: JwtModuleOptions
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        return req.cookies && req.cookies[authCookieKey];
      },
      ignoreExpiration: false,
      secretOrKey: jwtOptions.secret,
    });
  }

  async validate(payload: any) {
    return { ...payload };
  }
}
