import {
  Exclude,
  Expose,
} from 'class-transformer';
import {
  IsNotEmpty,
  Length,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class SampleDTO {
  @Expose()
  @ApiProperty({ default: 'name', minLength: 3, maxLength: 50 })
  @IsNotEmpty({ message: 'Name must not be empty!' })
  @Length(3, 50, { message: `Name must be between 3 and 50 characters long!` })
  name: string;

  @Expose()
  @ApiProperty({ default: 'desc' })
  @IsNotEmpty()
  @Length(10, 100, {
    message: `Description must be between 3 and 50 characters long!`,
  })
  description: string;
}
