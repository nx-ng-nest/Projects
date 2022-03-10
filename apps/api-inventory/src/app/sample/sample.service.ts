import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@projects/services';
import { FindManyOptions } from '@projects/utils';

import { SampleDTO } from './sample.dto';
import { Sample } from './sample.entity';

export class SampleService extends RepositoryService<
  Sample,
  SampleDTO,
  FindManyOptions
> {
  constructor(
    @InjectRepository(Sample) private readonly sampleRepo: Repository<Sample>
  ) {
    super(sampleRepo);
  }
}
