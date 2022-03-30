import { ICategory } from '@projects/interface';
import { Entity } from 'typeorm';

import { BaseEntity, TextColumn } from '../common';

@Entity()
export class Category extends BaseEntity implements ICategory {
  @TextColumn({ unique: true, minLength: 3, maxLength: 10 }) name: string;
}
