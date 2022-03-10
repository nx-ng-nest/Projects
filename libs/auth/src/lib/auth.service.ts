import { compare } from 'bcrypt';
import { Repository } from 'typeorm';

import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { genPassword } from '@projects/utils';

import { ForgotPasswordDTO } from './dtos/forgot-password.dto';
import { User } from './user';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly email: MailerService
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
    return this.jwtService.sign(payload);
  }

  async resetPassword(userId: number, newPassword: string) {
    const _ = await this.userRepo.update(userId, {
      password: newPassword,
    });
    return { message: 'Changed your password.' };
  }

  async forgotPassword(body: ForgotPasswordDTO) {
    try {
      const found = await this.userRepo.findOneOrFail({
        where: { username: body.username },
      });
      const newPassword = genPassword();

      await this.userRepo.update(found.id, { password: newPassword });

      this.email.sendMail({
        to: body.username,
        from: `Forgot Password <security@authdare.com>`,

        subject: 'Forgot Password',
        template: 'forgot-password',
        context: {
          title: 'Forgot Password',
          message: `Here is your new password. Please change it asap.`,
          password: newPassword,
        },
      });
      return {
        message: `Your new password is sent to your email ${body.username}. Please reset it asap.`,
      };
    } catch (err) {
      throw new NotFoundException('User not found!');
    }
  }
}
