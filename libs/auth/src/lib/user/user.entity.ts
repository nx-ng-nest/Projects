import {
  Column,
  Entity,
} from 'typeorm';

import { BaseEntity } from '@projects/orm';
import {
  ToHashFromStringTransformer,
  ToStringFromJSONTransformer,
} from '@projects/transformer';

import { EntityPermissionField } from '../permission';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'text', unique: true }) username: string;
  @Column({ type: 'text', transformer: ToHashFromStringTransformer() })
  password: string;

  @Column({
    type: 'text',
    transformer: ToStringFromJSONTransformer(),
    default: false,
  })
  permission: EntityPermissionField;
}
