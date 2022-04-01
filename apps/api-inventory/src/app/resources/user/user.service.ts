import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BaseDataService,
  User,
} from '@projects/models';

@Injectable()
export class UserService extends BaseDataService<User> {
  constructor(@InjectRepository(User) productRepo: Repository<User>) {
    super(productRepo);
  }
}
