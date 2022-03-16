import {
  Exclude,
  Expose,
} from 'class-transformer';
import { IsEmail } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { PasswordFieldValidation } from './common';

@Exclude()
export class LoginDto {
  @Expose()
  @ApiProperty({
    default: 'nxng.dev@gmail.com',
    type: 'string',
    format: 'email',
  })
  @IsEmail()
  username: string;

  @Expose()
  @ApiProperty({ default: 'password', type: 'string', format: 'password' })
  @PasswordFieldValidation()
  password: string;
}
