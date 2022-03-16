import {
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';

import { Category } from '../category';
import {
  BarcodeColumn,
  BaseEntity,
  TextColumn,
} from '../common';

@Entity()
export class Product extends BaseEntity {
  @TextColumn({ unique: true }) name: string;
  @TextColumn({ maxLength: 400 }) description: string;
  @BarcodeColumn() barcode: string;

  @ManyToMany(() => Category, (c) => c.id, { nullable: true })
  @JoinTable()
  categories?: Category[];
}
