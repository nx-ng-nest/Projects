import { IProduct } from '@projects/interface';
import { Entity, JoinTable, ManyToMany } from 'typeorm';

import { Category } from '../category';
import { BarcodeColumn, BaseEntity, JsonColumn, TextColumn } from '../common';

@Entity()
export class Product extends BaseEntity implements IProduct<Category> {
  @TextColumn({ unique: true }) name: string;
  @TextColumn({ maxLength: 400 }) description: string;
  @JsonColumn() features: Record<string, unknown>;
  @ManyToMany(() => Category, (c) => c.id, { nullable: true, eager: true })
  @JoinTable()
  categories: Category[];
}
