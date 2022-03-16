import {
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
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

function IsRequired(required: boolean | null) {
  return required ? IsNotEmpty() : IsOptional();
}

export function TextColumn(options?: ApiPropertyOptions & ColumnOptions) {
  return applyDecorators(
    ApiProperty({ format: 'text', default: 'Text Column' }),
    Column({ type: 'text', unique: !!options?.unique, length: 50 }),
    IsRequired(options?.required),
    Length(options?.minLength || 1, options?.maxLength || 50)
  );
}

export function NumericColumn(options?: ApiPropertyOptions & ColumnOptions) {
  return applyDecorators(
    ApiProperty({ format: 'number' }),
    Column({ type: 'numeric', unique: !!options?.unique }),
    IsRequired(options?.required)
  );
}

export function DateColumn(options?: ApiPropertyOptions & ColumnOptions) {
  return applyDecorators(
    ApiProperty({ format: 'date' }),
    Column({ type: 'date', unique: !!options?.unique }),
    IsRequired(options?.readOnly)
  );
}

export function PasswordColumn() {
  const msg = (ctype: string) =>
    `Password field must include at least  ${ctype} character!`;

  return applyDecorators(
    ApiProperty({ format: 'password', default: '!Password.!@11' }),
    Column({ type: 'text' }),
    IsNotEmpty({ message: 'Password must not be empty string!' }),
    MinLength(6, { message: msg('6') }),
    Matches(/[a-z]{1,}/, { message: msg('a lowercase') }),
    Matches(/[A-Z]{1,}/, { message: msg('a uppercase') }),
    Matches(/[0-9]{1,}/, { message: msg('a numeric') }),
    Matches(/[!@#$%^&*()_+-=<>,.]{1,}/, { message: msg('a special') })
  );
}
