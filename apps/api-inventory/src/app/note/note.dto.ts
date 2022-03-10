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
export class NoteDTO {
  @Expose()
  @ApiProperty({
    type: 'text',
    default: 'Text',
  })
  @IsNotEmpty({ message: 'Text must not be empty!' })
  @Length(3, 100, { message: `Text must be between 3 and 50 characters long!` })
  note: string;
}
