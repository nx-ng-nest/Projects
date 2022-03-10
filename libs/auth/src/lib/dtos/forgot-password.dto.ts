import {
  Exclude,
  Expose,
} from 'class-transformer';
import { IsEmail } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ForgotPasswordDTO {
  @Expose()
  @ApiProperty({
    default: 'nxng.dev@gmail.com',
    type: 'string',
    format: 'email',
  })
  @IsEmail()
  username: string;
}
