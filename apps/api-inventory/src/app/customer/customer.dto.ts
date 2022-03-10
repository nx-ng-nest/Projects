import {
  Exclude,
  Expose,
} from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  Length,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CustomerDTO {
  @Expose()
  @ApiProperty({ type: 'text', default: 'Some' })
  @IsOptional()
  @Length(0, 20)
  firstName: string;

  @Expose()
  @ApiProperty({ type: 'text', default: 'Some' })
  @IsOptional()
  @Length(0, 20)
  lastName: string;

  @Expose()
  @ApiProperty({ type: 'text', default: 'Some' })
  @IsOptional()
  @IsEmail()
  email: string;

  @Expose()
  @ApiProperty({ type: 'text', default: 'Some' })
  @IsOptional()
  @IsPhoneNumber()
  phone: string;
}
