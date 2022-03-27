import { Entity, JoinTable, ManyToMany } from 'typeorm';

import { Category } from '../category';
import {
  BarcodeColumn,
  BaseEntity,
  ID,
  JsonColumn,
  TextColumn,
} from '../common';

@Entity()
export class Product extends BaseEntity {
  @TextColumn({ unique: true }) name: string;
  @TextColumn({ maxLength: 400 }) description: string;
  @BarcodeColumn({}) barcode: string;
  @JsonColumn() features: Record<string, unknown>;

  @ManyToMany(() => Category, (c) => c.id, { nullable: true })
  @JoinTable()
  categories?: ID[];
}
