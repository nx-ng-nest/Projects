import {
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';

import { IProduct } from '@projects/interface';

import { Category } from '../category';
import {
  BaseEntity,
  JsonColumn,
  TextColumn,
} from '../common';

@Entity()
export class Product extends BaseEntity implements IProduct<Category> {
  @TextColumn({ type: 'uuid', unique: true, required: true }) uuid: string;
  @TextColumn({ type: 'uuid', unique: true, required: false }) id1: string;
  @TextColumn({ type: 'uuid', unique: true, required: false }) id2: string;
  @TextColumn({ type: 'uuid', unique: true, required: false }) id3: string;

  @TextColumn({ unique: true }) name: string;
  @TextColumn({ maxLength: 400 }) description: string;
  @JsonColumn({ default: '' }) features: Record<string, unknown>;

  @ManyToMany(() => Category, (c) => c.id, { nullable: true, eager: true })
  @JoinTable()
  categories: Category[];
}
