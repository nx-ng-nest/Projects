import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { BaseEntity } from '@projects/entity';

import { Product } from '../product';
import { Store } from '../store';

@Entity()
export class Price extends BaseEntity {
  @Column({ type: 'numeric' }) price: number;

  @ManyToOne(() => Product, {
    createForeignKeyConstraints: true,
    nullable: true,
  })
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Store, {
    createForeignKeyConstraints: true,
    nullable: true,
  })
  @JoinColumn()
  store: Store;
}
