import { Entity } from 'typeorm';

import {
  BaseEntity,
  TextColumn,
} from '../common';

@Entity()
export class Store extends BaseEntity {
  @TextColumn({ unique: true }) name: string;
}
