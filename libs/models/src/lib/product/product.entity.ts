import { IID, IProduct, IProductCreateDTO } from '@projects/interface';
import { Entity, JoinTable, ManyToMany, Unique } from 'typeorm';

import { Category } from '../category';
import { BarcodeColumn, BaseEntity, JsonColumn, TextColumn } from '../common';

@Entity()
export class Product extends BaseEntity implements IProduct<Category> {
  @TextColumn({ unique: true }) name: string;
  @TextColumn({ maxLength: 400 }) description: string;
  @BarcodeColumn({ unique: true, required: true }) barcode: string;
  @JsonColumn() features: Record<string, unknown>;

  @ManyToMany(() => Category, (c) => c.id, { nullable: true, eager: true })
  @JoinTable()
  categories: Category[];
}

export class ProductCreateDTO implements IProductCreateDTO {
  @TextColumn({ required: false }) id1: string;
  @TextColumn({ required: false }) id2: string;
  @TextColumn({ required: false }) id3: string;
  @TextColumn({ minLength: 3, maxLength: 30 }) name: string;
  @TextColumn({ maxLength: 50, required: false }) description: string;
  @TextColumn({ minLength: 10, maxLength: 15, unique: true }) barcode: string;

  @JsonColumn({ required: false }) features: Record<string, unknown>;
  categories: IID[];
}
