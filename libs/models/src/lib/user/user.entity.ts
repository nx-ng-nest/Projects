import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import {
  Column,
  Entity,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { ToHashFromStringTransformer } from '@projects/transformer';

import { BaseEntity } from '../common';

@Entity()
export class User extends BaseEntity {
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
}
