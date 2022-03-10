import {
  Column,
  Entity,
} from 'typeorm';

import { BaseEntity } from '@projects/entity';

@Entity()
export class Publicone extends BaseEntity {
  @Column({ type: 'text' }) text: string;
  @Column({ type: 'numeric' }) number: number;
}
