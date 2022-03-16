import { Strategy } from 'passport-local';

import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@projects/models';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(LocalStrategy.name);
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string
  ): Promise<Omit<User, 'password'> | never> {
    return await this.authService.validateUser(username, password);
  }
}
