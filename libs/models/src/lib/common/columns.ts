import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import {
  Column,
  ColumnOptions,
} from 'typeorm';

import { applyDecorators } from '@nestjs/common';
import {
  ApiProperty,
  ApiPropertyOptions,
} from '@nestjs/swagger';

import {
  HashTransformer,
  jsonStringTransformer,
} from './column.transformer';

function IsRequired(required: boolean | null) {
  return required ? IsNotEmpty() : IsOptional();
}

export function TextColumn(options?: ApiPropertyOptions & ColumnOptions) {
  return applyDecorators(
    ApiProperty({
      format: 'text',
      default: 'Text Column',
      required: options?.required == false ? false : true,
    }),
    Column({
      type: 'text',
      unique: !!options?.unique,

      nullable: options?.required == false ? true : false,
    }),
    IsRequired(options?.required == false ? false : true),
    Length(options?.minLength || 1, options?.maxLength || 50)
  );
}

export function NumericColumn(options?: ApiPropertyOptions & ColumnOptions) {
  return applyDecorators(
    ApiProperty({
      format: 'number',
      default: 1,
      required: options?.required == false ? false : true,
    }),
    Column({
      type: 'numeric',
      unique: !!options?.unique,
      nullable: options?.required == false ? true : false,
    }),
    IsRequired(options?.required == false ? false : true),
    Min(options?.minimum || Number.MAX_SAFE_INTEGER),
    Max(options?.maximum || Number.MAX_SAFE_INTEGER)
  );
}

export function DateColumn(options?: ApiPropertyOptions & ColumnOptions) {
  return applyDecorators(
    ApiProperty({
      format: 'date',
      default: '1-1-2005',
      required: options?.required == false ? false : true,
    }),
    Column({
      type: 'date',
      unique: !!options?.unique,
      nullable: options?.required == false ? true : false,
    }),
    IsRequired(options?.required == false ? false : true)
  );
}

export function EmailColumn(options?: ApiPropertyOptions & ColumnOptions) {
  return applyDecorators(
    ApiProperty({
      format: 'email',
      default: 'Text Column',
      required: options?.required == false ? false : true,
    }),
    Column({
      type: 'text',
      unique: true,
      nullable: options?.required == false ? true : false,
    }),
    IsRequired(options?.required == false ? false : true),
    IsEmail()
  );
}

export function PasswordColumn(options?: ApiPropertyOptions & ColumnOptions) {
  const msg = (ctype: string) =>
    `Password field must include at least  ${ctype} character!`;

  return applyDecorators(
    ApiProperty({
      format: 'password',
      default: '!Password.!@11',
      required: options?.required == false ? false : true,
    }),
    Column({
      type: 'text',
      nullable: options?.required == false ? true : false,
      transformer: HashTransformer(),
    }),
    IsRequired(options?.required == false ? false : true),
    MinLength(6, { message: msg('6') }),
    Matches(/[a-z]{1,}/, { message: msg('a lowercase') }),
    Matches(/[A-Z]{1,}/, { message: msg('a uppercase') }),
    Matches(/[0-9]{1,}/, { message: msg('a numeric') }),
    Matches(/[!@#$%^&*()_+-=<>,.]{1,}/, { message: msg('a special') })
  );
}

export function ArrayTextColumn(options?: ApiPropertyOptions & ColumnOptions) {
  return applyDecorators(
    ApiProperty({
      format: 'array',
      default: ['a', 'b'],
      required: options?.required == false ? false : true,
    }),
    Column({
      type: 'text',
      transformer: jsonStringTransformer(),
      nullable: options?.required == false ? true : false,
    }),
    IsRequired(options?.required == false ? false : true),
    Length(options?.minLength || 1, options?.maxLength || 50, { each: true })
  );
}

export function BarcodeColumn(options?: ApiPropertyOptions & ColumnOptions) {
  return TextColumn({
    minLength: 12,
    maxLength: 12,
    unique: true,
    ...options,
  });
}
