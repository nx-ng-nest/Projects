import { Transform } from 'class-transformer';
import {
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { IProduct } from '@projects/interface';

import { Category } from '../category';
import {
  BaseEntity,
  TextColumn,
} from '../common';
import { Feature } from '../feature';

@Entity()
export class Product extends BaseEntity implements IProduct<Category, Feature> {
  @TextColumn({ type: 'uuid', unique: true, required: true }) uuid: string;
  @TextColumn({ type: 'uuid', unique: true, required: false }) id1: string;
  @TextColumn({ type: 'uuid', unique: true, required: false }) id2: string;
  @TextColumn({ type: 'uuid', unique: true, required: false }) id3: string;

  @TextColumn({ unique: true }) name: string;
  @TextColumn({ maxLength: 400 }) description: string;

  @ManyToMany(() => Feature, (f) => f.id, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinTable()
  features: Feature[];

  @ApiProperty({
    default: [{ id: 1 }],
  })
  @ManyToMany(() => Category, (c) => c.id, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  @JoinTable()
  @Transform(({ value }) => {
    return (value && value?.map((e) => ({ id: e }))) || [];
  })
  categories: Category[];
}
