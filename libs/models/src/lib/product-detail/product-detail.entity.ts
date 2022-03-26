import {
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import {
  BaseEntity,
  NumericColumn,
} from '../common';
import { Product } from '../product';
import { Store } from '../store';

@Entity()
export class ProductDetail extends BaseEntity {
  @NumericColumn({ minimum: 0 }) price: number;
  @NumericColumn({ minimum: 0 }) quantity: number;

  @ManyToOne(() => Store, (s) => s.id, { eager: true })
  @JoinColumn()
  @ApiProperty({ default: { id: 1 } })
  store: Store;

  @ManyToOne(() => Product, (p) => p.id, { eager: true })
  @JoinColumn()
  @ApiProperty({ default: { id: 1 } })
  product: Product;
}
