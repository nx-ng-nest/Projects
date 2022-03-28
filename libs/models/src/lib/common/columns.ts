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
import { Column, ColumnOptions } from 'typeorm';

import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

import { HashTransformer, jsonStringTransformer } from './column.transformer';

function IsRequired(required: boolean | null) {
  return required ? IsNotEmpty() : IsOptional();
}

export function TextColumn(options?: ApiPropertyOptions & ColumnOptions) {
  return applyDecorators(
    ApiProperty({
      format: 'text',
      default: options?.default || 'Text Column',
      nullable: options?.required == false ? true : false,
      required: options?.required == false ? false : true,
    }),
    Column({
      type: 'text',
      unique: !!options?.unique,
      nullable: options?.required == false ? true : false,
      update: options?.update == false ? false : true,
    }),
    IsRequired(options?.required == false ? false : true),
    Length(options?.minLength || 1, options?.maxLength || 50)
  );
}

export function NumericColumn(options?: ApiPropertyOptions & ColumnOptions) {
  return applyDecorators(
    ApiProperty({
      format: 'number',
      default: options?.default || 1,
      nullable: options?.required == false ? true : false,
      required: options?.required == false ? false : true,
    }),
    Column({
      type: 'numeric',
      unique: !!options?.unique,
      nullable: options?.required == false ? true : false,
      update: options?.update == false ? false : true,
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
      default: options?.default || '1-1-2005',
      nullable: options?.required == false ? true : false,
      required: options?.required == false ? false : true,
    }),
    Column({
      type: 'date',
      unique: !!options?.unique,
      nullable: options?.required == false ? true : false,
      update: options?.update == false ? false : true,
    }),
    IsRequired(options?.required == false ? false : true)
  );
}

export function EmailColumn(options?: ApiPropertyOptions & ColumnOptions) {
  return applyDecorators(
    ApiProperty({
      format: 'email',
      default: options?.default || 'Text Column',
      nullable: options?.required == false ? true : false,
      required: options?.required == false ? false : true,
    }),
    Column({
      type: 'text',
      unique: true,
      nullable: options?.required == false ? true : false,
      update: options?.update == false ? false : true,
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
      default: options?.default || '!Password.!@11',
      nullable: options?.required == false ? true : false,
      required: options?.required == false ? false : true,
    }),
    Column({
      type: 'text',
      nullable: options?.required == false ? true : false,
      transformer: HashTransformer(),
      update: options?.update == false ? false : true,
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
      default: options?.default || ['a', 'b'],
      nullable: options?.required == false ? true : false,
      required: options?.required == false ? false : true,
    }),
    Column({
      type: 'text',
      transformer: jsonStringTransformer(),
      nullable: options?.required == false ? true : false,
      update: options?.update == false ? false : true,
    }),
    IsRequired(options?.required == false ? false : true),
    Length(options?.minLength || 1, options?.maxLength || 50, { each: true })
  );
}

export function BarcodeColumn(options?: ApiPropertyOptions & ColumnOptions) {
  return TextColumn({
    default: options?.default || '123456123456',
    minLength: 12,
    maxLength: 12,
    unique: true,
    ...options,
  });
}

export function JsonColumn(options?: ApiPropertyOptions & ColumnOptions) {
  return applyDecorators(
    ApiProperty({
      format: 'object',
      default: options?.default || {},
      nullable: options?.required == false ? true : false,
      required: options?.required == false ? false : true,
    }),
    Column({
      type: 'text',
      unique: !!options?.unique,
      nullable: options?.required == false ? true : false,
      update: options?.update == false ? false : true,
      transformer: jsonStringTransformer(),
      default: {},
    }),
    IsRequired(options?.required == false ? false : true)
  );
}
export function BooleanColumn(options?: ApiPropertyOptions & ColumnOptions) {
  return applyDecorators(
    ApiProperty({
      format: 'checkbox',
      default: options?.default || false,
      nullable: options?.required == false ? true : false,
      required: options?.required == false ? false : true,
    }),
    Column({
      type: 'boolean',
      nullable: options?.required == false ? true : false,
      update: options?.update == false ? false : true,
      default: options.default || false,
    }),
    IsRequired(options?.required == false ? false : true)
  );
}
