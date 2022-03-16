import {
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import {
  BaseEntity,
  NumericColumn,
} from '../common';
import { User } from '../user';

@Entity()
export class Sale extends BaseEntity {
  @NumericColumn({ minimum: 0, maximum: 100 }) tax: number;
  @NumericColumn({ minimum: 0, maximum: 100 }) discount: number;

  @NumericColumn() total: number;
  @NumericColumn() subtotal: number;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
  })
  @JoinColumn()
  user: User;
}
