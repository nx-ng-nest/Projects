import {
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import {
  BaseEntity,
  NumericColumn,
  TextColumn,
} from '../common';
import { User } from '../user';

@Entity()
export class Task extends BaseEntity {
  @TextColumn() title: string;
  @TextColumn({ maxLength: 500 }) description: string;
  @NumericColumn({ minimum: 1, maximum: 10 }) priority: number;

  @ManyToOne(() => User)
  @JoinColumn()
  assignee: User;
}
