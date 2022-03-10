import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import { BaseEntity } from '@projects/entity';

import { Category } from '../category';
import { Price } from '../price';
import { Quantity } from '../quantity';

@Entity()
export class Product extends BaseEntity {
  @Column({ type: 'text', unique: true }) name: string;
  @Column({ type: 'text', nullable: true }) description: string;
  @Column({ type: 'text' }) barcode: string;

  @ManyToMany(() => Category, { eager: true, cascade: true })
  @JoinTable()
  categories?: Category[];

  @ManyToOne(() => Price, { nullable: true, eager: true })
  @JoinTable()
  prices?: Price[];

  @ManyToOne(() => Quantity, { nullable: true, eager: true })
  @JoinTable()
  quantities?: Quantity[];
}
