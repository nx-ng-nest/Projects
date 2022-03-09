import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceService } from '@projects/resource';

import { SampleDTO } from './sample.dto';
import { Sample } from './sample.entity';

@Injectable()
export class SampleService extends ResourceService<Sample, SampleDTO> {
  constructor(@InjectRepository(Sample) repo: Repository<Sample>) {
    super(repo);
  }
}
