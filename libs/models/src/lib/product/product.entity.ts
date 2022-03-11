import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from '../common';
import { Productd } from '../productd';

@Entity()
export class Product extends BaseEntity {
  @Column({ type: 'text', unique: true })
  @ApiProperty({ type: String, format: 'text', default: 'Product name' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  name: string;

  @Column({ type: 'text' })
  @ApiProperty({ type: String, format: 'text', default: 'Product description' })
  @IsOptional()
  @Length(1, 50)
  description: string;

  @Column({ type: 'text', unique: true })
  @ApiProperty({ type: String, format: 'text', default: 'Product barcode' })
  @IsNotEmpty()
  @IsString()
  barcode: string;

  @OneToMany(() => Productd, (p) => p.product)
  productds: Productd[];
}
