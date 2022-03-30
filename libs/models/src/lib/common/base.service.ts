import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { UnprocessableEntityException } from '@nestjs/common';

export abstract class BaseDataService<T> {
  constructor(protected readonly repo: Repository<T>) {}

  /**
   * Check data is already in the database or not
   * @param t T
   */
  async isUnique(t: any) {
    const uniqueColumns = this.repo.metadata.uniques.map(
      (e) => e.givenColumnNames[0]
    );

    for (const u of uniqueColumns) {
      const count = await this.repo.count({ [u]: t[u] });
      if (count > 0) {
        throw new UnprocessableEntityException(`${u} must be unique!`);
      }
    }
  }

  async find(options?: FindManyOptions) {
    try {
      return await this.repo.find(options);
    } catch (err) {
      throw new UnprocessableEntityException(err.message);
    }
  }

  async save(body: DeepPartial<T>) {
    await this.isUnique(body);
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
    await this.isUnique(updated);
    try {
      return await this.repo.update(id, updated);
    } catch (err) {
      throw new UnprocessableEntityException(err.message);
    }
  }
}
