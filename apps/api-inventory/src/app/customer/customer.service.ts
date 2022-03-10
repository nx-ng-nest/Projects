import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@projects/services';
import { FindManyOptions } from '@projects/utils';

import { CustomerDTO } from './customer.dto';
import { Customer } from './customer.entity';

export class CustomerService extends RepositoryService<
  Customer,
  CustomerDTO,
  FindManyOptions
> {
  constructor(
    @InjectRepository(Customer) private readonly customerRepo: Repository<Customer>
  ) {
    super(customerRepo);
  }
}
