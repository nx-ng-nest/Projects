import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { BaseEntity } from '@projects/entity';

import { Note } from '../note';

@Entity()
export class Customer extends BaseEntity {
  @Column({ type: 'text', nullable: true }) firstName: string;
  @Column({ type: 'text', nullable: true }) lastName: string;
  @Column({ type: 'text' }) email: string;
  @Column({ type: 'text', nullable: true }) phone: string;

  @OneToMany(() => Note, (n) => n.id, {
    eager: true,
    nullable: true,
  })
  @JoinTable()
  notes: Note[];
}
