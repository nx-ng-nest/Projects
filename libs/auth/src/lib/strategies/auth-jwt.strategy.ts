import { Request } from 'express';
import { Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { JwtOptions } from '../auth-jwt.options';
import { AuthEnum } from '../auth.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        return req.cookies && req.cookies[AuthEnum.AUTH_TOKEN_COOKIE_KEY];
      },
      ignoreExpiration: false,
      secretOrKey: JwtOptions.secret,
    });
  }

  async validate(payload: any) {
    return { ...payload };
  }
}
