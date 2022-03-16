import {
  DeepPartial,
  FindManyOptions,
  Repository,
} from 'typeorm';
import {
  QueryDeepPartialEntity,
} from 'typeorm/query-builder/QueryPartialEntity';

import { UnprocessableEntityException } from '@nestjs/common';

export abstract class BaseDataService<T> {
  constructor(protected readonly repo: Repository<T>) {}

  async find(options?: FindManyOptions) {
    try {
      return await this.repo.find(options);
    } catch (err) {
      throw new UnprocessableEntityException(err.message);
    }
  }

  async save(body: DeepPartial<T>) {
    try {
      return await this.repo.save(body);
    } catch (err) {
      throw new UnprocessableEntityException(err.message);
    }
  }

  async delete(id: number) {
    try {
      return this.repo.delete(id);
    } catch (err) {
      throw new UnprocessableEntityException(err.message);
    }
  }

  async update(id: number, updated: QueryDeepPartialEntity<T>) {
    try {
      return await this.repo.update(id, updated);
    } catch (err) {
      throw new UnprocessableEntityException(err.message);
    }
  }
}
