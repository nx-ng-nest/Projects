import {
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { productList } from './product-list';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule implements OnModuleInit {
  constructor(private readonly productService: ProductService) {}
  async onModuleInit() {
    setTimeout(async () => {
      for (const p of productList()) {
        await this.productService.createOne(p);
      }
    }, 2000);
  }
}
