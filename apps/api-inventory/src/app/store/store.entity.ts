import {
  Column,
  Entity,
} from 'typeorm';

import { BaseEntity } from '@projects/entity';

@Entity()
export class Store extends BaseEntity {
  @Column({ type: 'text', unique: true }) name: string;
}
