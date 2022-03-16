import { Entity } from 'typeorm';

import {
  BaseEntity,
  TextColumn,
} from '../common';

@Entity()
export class Category extends BaseEntity {
  @TextColumn({ unique: true }) name: string;
}
