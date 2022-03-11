import {
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import {
  Column,
  Entity,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from '../common';

@Entity()
export class Category extends BaseEntity {
  @Column({ type: String, unique: true })
  @ApiProperty({ type: String, default: 'category 01', format: 'text' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;
}
