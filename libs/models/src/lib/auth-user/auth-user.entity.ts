import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import {
  Column,
  Entity,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import {
  ToHashFromStringTransformer,
  ToStringFromJSONTransformer,
} from '@projects/transformer';

import { BaseEntity } from '../common';

@Entity()
export class AuthUser extends BaseEntity {
  @Column({ type: 'text' })
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  username: string;

  @Column({ type: 'text', transformer: ToHashFromStringTransformer() })
  @ApiProperty({ type: String, format: 'text', default: 'Password' })
  @IsNotEmpty()
  @Length(6, 30)
  password: string;

  @Column({ type: 'text', transformer: ToStringFromJSONTransformer() })
  @ApiProperty({
    type: String,
    format: 'array',
  })
  @IsNotEmpty()
  @Matches(/^(GET | POST | PUT | DELETE | UPDATE | PATCH):[A-Z]/, {
    each: true,
    message: 'Permission string must be in a format of METHOD:RESOURCE_NAME',
  })
  permissions: string[];
}
