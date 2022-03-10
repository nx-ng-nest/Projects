import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { BaseEntity } from '@projects/entity';

import { Customer } from '../customer';

@Entity()
export class Note extends BaseEntity {
  @Column({ type: 'text' })
  note: string;

  @ManyToOne(() => Customer, (c) => c.id, { eager: true })
  @JoinColumn()
  customer: Customer;
}
