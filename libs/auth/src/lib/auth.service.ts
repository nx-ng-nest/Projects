import { compare } from 'bcrypt';
import { Repository } from 'typeorm';

import {
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<Omit<User, 'password'> | null> {
    try {
      const user = await this.userRepo.findOneOrFail({ username });
      const isPasswordMatch = await compare(password, user.password);
      if (isPasswordMatch) {
        const { password, ...result } = user;
        return result;
      }
      throw new UnauthorizedException();
    } catch (err) {
      this.logger.error(err.message);
      throw new UnauthorizedException();
    }
  }

  async login(user: User): Promise<string> {
    const payload = {
      username: user.username,
      sub: user.id,
      permissions: user.permissions,
    };
    return this.jwtService.sign(payload);
  }
}
