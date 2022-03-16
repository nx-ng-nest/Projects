import { Entity } from 'typeorm';

import { BaseEntity } from '../common';

@Entity()
export class User extends BaseEntity {
  username: string;
  password: string;
  permissions: string[];
}
