import { IMessage } from '@projects/interface';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity, TextColumn } from '../common';
import { User } from '../user';

@Entity()
export class Message extends BaseEntity implements IMessage {
  @ManyToOne(() => User, (u) => u.id)
  @JoinColumn()
  from: User;

  @ManyToOne(() => User, (u) => u.id)
  @JoinColumn()
  to: User;

  @TextColumn({ required: false })
  subject: string;

  @TextColumn({ maxLength: 500 })
  body: string;
}
