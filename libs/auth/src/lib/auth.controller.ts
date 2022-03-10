import { Response } from 'express';

import { MailerService } from '@nestjs-modules/mailer';
import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  UserData,
  UserID,
} from '@projects/utils';
import { ValidateCreate } from '@projects/validation';

import { AuthService } from './auth.service';
import { CookiesEnum } from './cookies.enum';
import { AuthJwtGuard } from './guards';
import { AuthLocalGuard } from './guards/auth-local.guard';
import { LoginDto } from './login.dto';
import { ResetPasswordDTO } from './reset-password.dto';
import { User } from './user';

@ApiTags(AuthController.name)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private emailService: MailerService
  ) {}

  @UseGuards(AuthLocalGuard)
  @Post('login')
  async login(
    @UserData() user: User,
    @Res() res: Response,
    @Body() credentails: LoginDto
  ) {
    const token = await this.authService.login(user);
    await this.emailService.sendMail({
      to: user.username,
      subject: 'Welcome',
      template: 'welcome',
      context: {
        message: 'Welcom back!',
      },
    });

    res.cookie(CookiesEnum.AUTH_TOKEN_NAME, token, {
      httpOnly: true,
      sameSite: true,
      secure: true,
    });
    res.send({ message: 'Welcome!' });
  }

  @UseGuards(AuthJwtGuard)
  @Get('profile')
  profile(@UserData() user: User) {
    return user;
  }

  @UseGuards(AuthJwtGuard)
  @Post('reset-password')
  resetPassword(
    @UserID() userid: number,
    @Body(ValidateCreate) resetForm: ResetPasswordDTO
  ) {
    return this.authService.resetPassword(userid, resetForm.password);
  }
}
