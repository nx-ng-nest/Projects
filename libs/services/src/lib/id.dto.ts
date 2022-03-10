import {
  Exclude,
  Expose,
} from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class IDDTO {
  @Expose()
  @ApiProperty({ type: 'number', default: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  id: number;
}
