import {
  CookieOptions,
  Response,
} from 'express';

import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
import { IAuthUser } from './IAuthUser';
import {
  InjectAuthCookie,
  InjectAuthCookieOptions,
} from './providers';

@ApiTags(AuthController.name)
@Controller(AuthController.name)
export class AuthController {
  constructor(
    @InjectAuthCookie() private readonly AUTH_COOKIE_KEY: string,
    @InjectAuthCookieOptions()
    private readonly AUTH_COOKIE_OPTIONS: CookieOptions,
    private readonly authService: AuthService
  ) {}

  @UseGuards(AuthLocalGuard)
  @Post('login')
  async login(
    @UserData() user: IAuthUser,
    @Res() res: Response,
    @Body(ValidationPipe) credentails: LoginDto
  ) {
    const token = await this.authService.login(user);
    res.cookie(this.AUTH_COOKIE_KEY, token, this.AUTH_COOKIE_OPTIONS);
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
