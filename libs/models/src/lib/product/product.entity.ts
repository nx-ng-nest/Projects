import { Entity } from 'typeorm';

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
}
