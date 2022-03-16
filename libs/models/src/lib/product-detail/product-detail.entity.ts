import {
  Entity,
  JoinColumn,
  OneToMany,
} from 'typeorm';

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

  @OneToMany(() => Store, (s) => s.id)
  @JoinColumn()
  store: Store;

  @OneToMany(() => Product, (p) => p.id)
  @JoinColumn()
  product: Product;
}
