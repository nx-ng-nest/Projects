import {
  Exclude,
  Expose,
} from 'class-transformer';
import {
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IDDTO } from '@projects/services';

import { Product } from '../product';

@Exclude()
export class SaleDTO {
  @Expose()
  @ApiProperty({ type: 'object', default: [{ id: 1 }] })
  products: Product[];

  @Expose()
  @ApiProperty({ type: 'object', default: { id: 1 } })
  @IsNotEmpty()
  @ValidateNested()
  user: IDDTO;

  @Expose()
  @ApiProperty({ type: 'object', default: { id: 2 } })
  @IsNotEmpty()
  @ValidateNested()
  store: IDDTO;
}
