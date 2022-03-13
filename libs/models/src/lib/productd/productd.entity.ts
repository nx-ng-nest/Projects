import {
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from '../common';
import { Product } from '../product/product.entity';
import { Store } from '../store';

@Entity()
export class ProductDetail extends BaseEntity {
  @Column({
    type: 'numeric',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => new Number(value),
    },
  })
  @ApiProperty({ type: Number, default: 200.2, format: 'number' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantity: number;

  @Column({
    type: 'numeric',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => new Number(value),
    },
  })
  @ApiProperty({ type: Number, default: 200.2, format: 'number' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ManyToOne(() => Store, (s) => s.id, { createForeignKeyConstraints: true })
  @JoinColumn()
  store: number;

  @ManyToOne(() => Product, (p) => p.id, { createForeignKeyConstraints: true })
  @JoinColumn()
  product: number;
}
