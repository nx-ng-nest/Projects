import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import { User } from '@projects/auth';
import { BaseEntity } from '@projects/entity';

import { Product } from '../product';
import { Store } from '../store';

@Entity()
export class Sale extends BaseEntity {
  @ManyToMany(() => Product, { eager: true })
  @JoinTable()
  products: Product[];

  @ManyToOne(() => User, {
    eager: true,
    nullable: true,
    createForeignKeyConstraints: true,
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Store, {
    eager: true,
    nullable: true,
    createForeignKeyConstraints: true,
  })
  @JoinColumn()
  store: Store;
}
