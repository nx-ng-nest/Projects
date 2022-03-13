import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { IProduct } from '@projects/common';

import { Category } from '../category';
import { BaseEntity } from '../common';
import { ProductDetail } from '../productd';

@Entity()
export class Product extends BaseEntity implements IProduct {
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

  @OneToMany(() => ProductDetail, (p) => p.product)
  productDetail: ProductDetail[];

  @ManyToMany(() => Category, (c) => c.id, { eager: true })
  @JoinTable()
  categories: Category[];
}
