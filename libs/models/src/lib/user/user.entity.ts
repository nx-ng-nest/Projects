import { Entity } from 'typeorm';

import {
  ArrayTextColumn,
  BaseEntity,
  EmailColumn,
  PasswordColumn,
} from '../common';

@Entity()
export class User extends BaseEntity {
  @EmailColumn({ required: true })
  username: string;

  @PasswordColumn({ required: true })
  password: string;

  @ArrayTextColumn({ required: true })
  permissions: string[];
}
