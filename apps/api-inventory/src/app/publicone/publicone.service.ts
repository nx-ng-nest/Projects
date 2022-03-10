import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@projects/services';
import { FindManyOptions } from '@projects/utils';

import { PubliconeDTO } from './publicone.dto';
import { Publicone } from './publicone.entity';

export class PubliconeService extends RepositoryService<
  Publicone,
  PubliconeDTO,
  FindManyOptions
> {
  constructor(
    @InjectRepository(Publicone) private readonly publiconeRepo: Repository<Publicone>
  ) {
    super(publiconeRepo);
  }
}
