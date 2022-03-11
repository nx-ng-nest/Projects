import {
  Column,
  Entity,
} from 'typeorm';

import { BaseEntity } from '@projects/models';
import {
  ToHashFromStringTransformer,
  ToStringFromJSONTransformer,
} from '@projects/transformer';

import { UserPermission } from '../permission';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'text' }) username: string;
  @Column({ type: 'text', transformer: ToHashFromStringTransformer() })
  password: string;
  @Column({
    type: 'text',
    transformer: ToStringFromJSONTransformer(),
  })
  permissions: UserPermission;
}
