import { Response } from 'express';

import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@projects/models';

import { CookieOptions } from './auth-cookie.options';
import { AuthEnum } from './auth.enum';
import { AuthService } from './auth.service';
import {
  UserData,
  UserID,
} from './decorators';
import {
  ForgotPasswordDTO,
  LoginDto,
  ResetPasswordDTO,
} from './dtos/';
import {
  AuthJwtGuard,
  AuthLocalGuard,
} from './guards';

@ApiTags(AuthController.name)
@Controller(AuthController.name)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthLocalGuard)
  @Post('login')
  async login(
    @UserData() user: User,
    @Res() res: Response,
    @Body() credentails: LoginDto
  ) {
    const token = await this.authService.login(user);

    res.cookie(AuthEnum.AUTH_TOKEN_COOKIE_KEY, token, CookieOptions);
    res.end();
  }

  /**
   * Get user profile data
   * @param user
   * @returns
   */
  @UseGuards(AuthJwtGuard)
  @Get('profile')
  profile(@UserData() user: any) {
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
    @Body(ValidationPipe) resetForm: ResetPasswordDTO
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
