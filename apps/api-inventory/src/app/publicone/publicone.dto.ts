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
export class PubliconeDTO {
  @Expose()
  @ApiProperty({
    type: 'text',
    default: 'Text',
  })
  @IsNotEmpty({ message: 'Text must not be empty!' })
  @Length(3, 50, { message: `Text must be between 3 and 50 characters long!` })
  text: string;

  @Expose()
  @ApiProperty({
    type: 'number',
    default: 100,
  })
  number: number;
}
