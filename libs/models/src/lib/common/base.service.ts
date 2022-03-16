import {
  DeepPartial,
  FindManyOptions,
  Repository,
} from 'typeorm';
import {
  QueryDeepPartialEntity,
} from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseDataService<T> {
  constructor(protected readonly repo: Repository<T>) {}

  find(options?: FindManyOptions) {
    return this.repo.find(options);
  }

  save(body: DeepPartial<T>) {
    return this.repo.save(body);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }

  update(id: number, updated: QueryDeepPartialEntity<T>) {
    return this.repo.update(id, updated);
  }
}
