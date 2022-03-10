import {
  Column,
  Entity,
} from 'typeorm';

import { BaseEntity } from '@projects/entity';

@Entity()
export class Customer extends BaseEntity {
  @Column({ type: 'text', nullable: true }) firstName: string;
  @Column({ type: 'text', nullable: true }) lastName: string;
  @Column({ type: 'text' }) email: string;
  @Column({ type: 'text', nullable: true }) phone: string;
}
