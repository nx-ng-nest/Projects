import {
  Column,
  Entity,
} from 'typeorm';

import { BaseEntity } from '@projects/entity';

@Entity()
export class Note extends BaseEntity {
  @Column({ type: 'text' })
  note: string;
}
