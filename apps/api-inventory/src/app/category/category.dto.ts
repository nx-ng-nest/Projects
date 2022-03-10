import {
  Exclude,
  Expose,
} from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CategoryDTO {
  @Expose()
  @ApiProperty({
    type: 'text',
    default: 'Category 1',
  })
  @IsNotEmpty({ message: 'Name must not be empty!' })
  @IsString()
  @Length(1, 50, { message: `Name must be between 3 and 50 characters long!` })
  name: string;
}
