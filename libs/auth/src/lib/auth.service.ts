import { compare } from 'bcrypt';
import { ClassConstructor } from 'class-transformer';
import {
  getRepository,
  Repository,
} from 'typeorm';

import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';

import { AUTH_EVENTS } from './auth-events.enum';
import { ForgotPasswordDTO } from './dtos/forgot-password.dto';
import { IAuthUser } from './IAuthUser';
import { InjectAuthUserEntity } from './providers';
import { genPassword } from './utils/gen-password';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);
  private readonly userRepo: Repository<IAuthUser>;

  constructor(
    @InjectAuthUserEntity() userEntity: ClassConstructor<IAuthUser>,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2
  ) {
    this.userRepo = getRepository(userEntity);
  }

  async validateUser(
    username: string,
    password: string
  ): Promise<Omit<IAuthUser, 'password'> | null> {
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

  async login(user: IAuthUser): Promise<string> {
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
