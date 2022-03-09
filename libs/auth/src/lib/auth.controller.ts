import {
  Request,
  Response,
} from 'express';

import { MailerService } from '@nestjs-modules/mailer';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CookiesEnum } from './cookies.enum';
import { Public } from './decorator';
import { AuthJwtGuard } from './guards/auth-jwt.guard';
import { AuthLocalGuard } from './guards/auth-local.guard';
import { User } from './user';
import { UserCredentials } from './user-credentials';

@ApiTags(AuthController.name)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private emailService: MailerService
  ) {}

  @Public()
  @UseGuards(AuthLocalGuard)
  @Post('login')
  async login(
    @Req() req: Request & { user: User },
    @Res() res: Response,
    @Body() credentails: UserCredentials
  ) {
    const token = await this.authService.login(req.user);
    const result = await this.emailService.sendMail({
      from: 'security@authdare.com',
      to: req.user.username,
      subject: 'Welcome',
      html: '<h1>Welcome back!</h1>',
    });

    console.log(result);

    res.cookie(CookiesEnum.AUTH_TOKEN_NAME, token, {
      httpOnly: true,
      sameSite: true,
      secure: true,
    });
    res.send({ message: 'Welcome!' });
  }

  @Get('profile')
  @UseGuards(AuthJwtGuard)
  profile(@Req() req: Request) {
    return req.user;
  }
}
