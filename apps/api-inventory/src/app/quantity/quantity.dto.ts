import {
  Exclude,
  Expose,
} from 'class-transformer';
import {
  IsNotEmpty,
  Min,
  ValidateNested,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IDDTO } from '@projects/services';

@Exclude()
export class QuantityDTO {
  @Expose()
  @ApiProperty({ type: 'text', default: 100.89 })
  @IsNotEmpty()
  @Min(0)
  quantity: number;

  @Expose()
  @ApiProperty({ type: 'object', default: { id: 1 } })
  @IsNotEmpty()
  @ValidateNested()
  product: IDDTO;

  @Expose()
  @ApiProperty({ type: 'object', default: { id: 1 } })
  @IsNotEmpty()
  @ValidateNested()
  store: IDDTO;
}
