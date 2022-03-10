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
export class StoreDTO {
  @Expose()
  @ApiProperty({
    type: 'text',
    default: 'Text',
  })
  @IsNotEmpty({ message: 'Name must not be empty!' })
  @Length(3, 50, { message: `Name must be between 3 and 50 characters long!` })
  name: string;
}
