import {
  Exclude,
  Expose,
} from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  Length,
  ValidateNested,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IDDTO } from '@projects/services';

@Exclude()
export class ProductDTO {
  @Expose()
  @ApiProperty({
    type: 'text',
    default: 'text value',
    format: 'text',
  })
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @Expose()
  @ApiProperty({
    type: 'text',
    default: 'text value',
    format: 'text',
  })
  @IsOptional()
  @Length(3, 100)
  description: string;

  @Expose()
  @ApiProperty({
    type: 'text',
    default: 'text value',
    format: 'text',
  })
  @IsNotEmpty()
  @Length(4, 30)
  barcode: string;

  @Expose()
  @ApiProperty({ type: 'array', default: [] })
  @IsOptional()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  categories: IDDTO[];
}
