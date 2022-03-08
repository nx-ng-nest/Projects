import { compare } from 'bcrypt';
import { Response } from 'express';
import { Repository } from 'typeorm';

import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidateCreate } from '@projects/validation';

import { AuthUserDTO } from './auth-user.dto';
import { AUTH_COOKIE_NAME } from './consts';
import { Public } from './permission';
import { User } from './user/user.entity';

@ApiTags(AuthController.name)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwt: JwtService,
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}

  @Public()
  @Post('login')
  async login(
    @Body(ValidateCreate) authUser: AuthUserDTO,
    @Res() res: Response
  ) {
    try {
      const foundUser = await this.userRepo.findOneOrFail({
        where: { username: authUser.username },
      });

      console.log(foundUser);

      const isPasswordMatch = await compare(
        authUser.password,
        foundUser.password
      );
      if (isPasswordMatch) {
        const { password, ...userJwtData } = foundUser;
        const token = this.jwt.sign(userJwtData);
        res.cookie(AUTH_COOKIE_NAME, token, {
          httpOnly: true,
          secure: true,
          sameSite: true,
          maxAge: 60 * 1000 * 60 * 24 * 90,
        });
        res.status(HttpStatus.OK);
        res.send({ message: 'Welcome' });
        return;
      }
      throw new UnauthorizedException();
    } catch (err) {
      throw new UnauthorizedException('Credentials do not match!');
    }
  }
}
