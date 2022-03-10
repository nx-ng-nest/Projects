import {
  Exclude,
  Expose,
} from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { UserPermission } from '../permission';

@Exclude()
export class UserDTO {
  @Expose()
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  password: string;

  @Expose()
  @ApiProperty({ type: 'object' })
  permissions: UserPermission;
}
