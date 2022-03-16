import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class AuthUser {
  @PrimaryGeneratedColumn() id: number;

  @ApiProperty({ type: String, default: 'username@company.com' })
  @Column({ type: 'text' })
  username: string;

  @ApiProperty({ type: String, default: 'username@company.com' })
  @Column({ type: 'text' })
  password: string;

  @Column({
    type: 'text',
    transformer: {
      to: (v) => v && JSON.stringify(v),
      from: (v) => v && JSON.parse(v),
    },
  })
  permissions: string[];
}
