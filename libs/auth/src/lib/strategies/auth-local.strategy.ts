import { Strategy } from 'passport-local';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from '../auth.service';
import { IAuthUser } from '../IAuthUser';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string
  ): Promise<Omit<IAuthUser, 'password'> | never> {
    return await this.authService.validateUser(username, password);
  }
}
