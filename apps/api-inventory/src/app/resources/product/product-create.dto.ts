import { ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import {
  Product,
  ProductDetail,
} from '@projects/models';

export class ProductCreateDTO {
  @ValidateNested()
  @ApiProperty({})
  product: Product;

  @ValidateNested()
  @ApiProperty({})
  productDetail: ProductDetail;
}
