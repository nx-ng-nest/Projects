import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { AuthUser } from '../auth-user';
import { BaseEntity } from '../common';

@Entity()
export class UserDetail extends BaseEntity {
  @Column({ type: 'text' })
  @ApiProperty({ type: String, format: 'text' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  firstName: string;

  @Column({ type: 'text' })
  @ApiProperty({ type: String, format: 'text' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  lastName: string;

  @Column({ type: 'text' })
  @ApiProperty({ type: String, format: 'text' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @OneToOne(() => AuthUser, { createForeignKeyConstraints: true })
  @JoinColumn()
  authUser: AuthUser;
}
