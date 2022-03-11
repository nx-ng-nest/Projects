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
export class Store extends BaseEntity {
  @Column({ type: 'text' })
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  name: string;
}
