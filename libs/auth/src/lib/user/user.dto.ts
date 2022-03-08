import {
  Exclude,
  Expose,
} from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { EntityPermissionField } from '../permission';

@Exclude()
export class UserDTO {
  @ApiProperty({
    type: 'string',
    description: 'email',
    format: 'email',
    required: true,
  })
  @Expose()
  @IsNotEmpty({ message: 'Usernamme is requried!' })
  @IsString({ message: 'Usernamme must be a string value.' })
  @IsEmail()
  username: string;

  @ApiProperty({
    type: 'string',
    format: 'password',
    minLength: 6,
    maxLength: 100,
    required: true,
  })
  @Expose()
  @IsNotEmpty({ message: 'Password is requried!' })
  @IsString({ message: 'Password must be a string value.' })
  @Length(6, 100, {
    message: 'Password field must be between 6 and 100 characters long!',
  })
  password: string;

  @ApiProperty({ type: 'object', format: 'object' })
  @Expose()
  @IsNotEmpty()
  permission: EntityPermissionField;
}
