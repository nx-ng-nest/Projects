import {
  Exclude,
  Expose,
} from 'class-transformer';
import {
  IsEmail,
  Length,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UserCredentials {
  @Expose() @ApiProperty({ type: 'string' }) @IsEmail() username: string;
  @Expose() @ApiProperty({ type: 'string' }) @Length(6, 100) password: string;
}
