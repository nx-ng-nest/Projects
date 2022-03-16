import {
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import {
  BaseEntity,
  DateColumn,
} from '../common';
import { Store } from '../store';
import { User } from '../user';

@Entity()
export class ClockIn extends BaseEntity {
  @DateColumn({ update: false }) start: Date;
  @DateColumn({ update: false }) stop: Date;

  @ManyToOne(() => User, (u) => u.id)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Store, (s) => s.id)
  @JoinColumn()
  store: Store;
}
