import { compare } from 'bcrypt';
import { Repository } from 'typeorm';

import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@projects/models';

import { AUTH_EVENTS } from './auth-events.enum';
import { ForgotPasswordDTO } from './dtos/forgot-password.dto';
import { genPassword } from './utils/gen-password';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2
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
    const { password, ...payload } = user;
    const token = this.jwtService.sign(payload);
    this.eventEmitter.emit(AUTH_EVENTS.LOGIN, {
      ...user,
      token,
    });
    return token;
  }

  async resetPassword(userId: number, newPassword: string) {
    const foundUser = await this.userRepo.findOne(userId);

    const updatedUserPassword = await this.userRepo.update(userId, {
      password: newPassword,
    });

    this.eventEmitter.emit(AUTH_EVENTS.RESET_PASSWORD, {
      ...foundUser,
      password: newPassword,
    });
  }

  async forgotPassword(body: ForgotPasswordDTO) {
    try {
      const { id, username } = await this.userRepo.findOneOrFail({
        where: { username: body.username },
      });

      const newPassword = genPassword();

      await this.userRepo.update(id, { password: newPassword });

      this.eventEmitter.emit(AUTH_EVENTS.FORGOT_PASSWORD, {
        id,
        username,
        password: newPassword,
      });
    } catch (err) {
      throw new NotFoundException('User not found!');
    }
  }
}
