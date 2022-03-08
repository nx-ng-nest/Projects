import {
  Column,
  Entity,
} from 'typeorm';

import { BaseEntity } from '@projects/orm';

@Entity()
export class Sample extends BaseEntity {
  @Column({ type: 'text' }) name: string;
  @Column({ type: 'text' }) description: string;
}
