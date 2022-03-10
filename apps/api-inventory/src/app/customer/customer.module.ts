import {
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { customerList } from './customer-list';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule implements OnModuleInit {
  constructor(private customerService: CustomerService) {}

  async onModuleInit() {
    for (const c of customerList()) {
      await this.customerService.createOne(c);
    }
  }
}
