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
  AuthUser,
  UserDetail,
} from '@projects/models';
import {
  UserData,
  UserID,
} from '@projects/utils';
import { ValidateCreate } from '@projects/validation';

import { AuthService } from './auth.service';
import { CookiesEnum } from './cookies.enum';
import { ForgotPasswordDTO } from './dtos/forgot-password.dto';
import { LoginDto } from './dtos/login.dto';
import { ResetPasswordDTO } from './dtos/reset-password.dto';
import { AuthJwtGuard } from './guards';
import { AuthLocalGuard } from './guards/auth-local.guard';

@ApiTags(AuthController.name)
@Controller(AuthController.name)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private emailService: MailerService
  ) {}

  @UseGuards(AuthLocalGuard)
  @Post('login')
  async login(
    @UserData() user: AuthUser,
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

  /**
   * Get user profile data
   * @param user
   * @returns
   */
  @UseGuards(AuthJwtGuard)
  @Get('profile')
  profile(@UserData() user: UserDetail) {
    return user;
  }

  /**
   * Reset user password
   * @param userid
   * @param resetForm
   * @returns
   */
  @UseGuards(AuthJwtGuard)
  @Post('reset-password')
  resetPassword(
    @UserID() userid: number,
    @Body(ValidateCreate) resetForm: ResetPasswordDTO
  ) {
    return this.authService.resetPassword(userid, resetForm.password);
  }

  /**
   * Forgot password
   * Request a new password through email
   * @param body
   * @returns
   */
  @Post('forgot-password')
  forgotPassword(@Body() body: ForgotPasswordDTO) {
    return this.authService.forgotPassword(body);
  }
}
