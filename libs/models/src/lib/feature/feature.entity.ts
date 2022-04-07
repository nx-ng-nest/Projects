import { Entity } from 'typeorm';

import { IFeature } from '@projects/interface';

import {
  BaseEntity,
  TextColumn,
} from '../common';

@Entity()
export class Feature extends BaseEntity implements IFeature {
  @TextColumn({ minLength: 3, maxLength: 10 }) key: string;
  @TextColumn({ minLength: 3, maxLength: 30 }) value: string;
}
