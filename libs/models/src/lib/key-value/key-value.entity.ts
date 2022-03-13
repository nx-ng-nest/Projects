import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import {
  Column,
  Entity,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { IKeyValue } from '@projects/common';
import { ToStringFromJSONTransformer } from '@projects/transformer';

import { BaseEntity } from '../common';

@Entity()
export class KeyValue extends BaseEntity implements IKeyValue {
  @Column({ type: 'text', unique: true })
  @ApiProperty({ type: String, default: 'Key for value' })
  @IsNotEmpty()
  @IsString()
  key: string;

  @Column({ type: 'text', transformer: ToStringFromJSONTransformer() })
  @ApiProperty({ type: String, default: 'Value of the key' })
  @IsNotEmpty()
  @IsString()
  value: string;
}
