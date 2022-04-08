import { Response } from 'express';
import { BehaviorSubject } from 'rxjs';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import {
  QueryDeepPartialEntity,
} from 'typeorm/query-builder/QueryPartialEntity';

import {
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

export abstract class BaseDataService<T> {
  private readonly logger: Logger;
  constructor(protected readonly repo: Repository<T>) {
    this.logger = new Logger(repo.metadata.name);
  }

  /**
   * Check data is already in the database or not
   * @param t T
   */
  async isUnique(t: any) {
    this.logger.debug(this.isUnique.name + ' item:', t);
    const uniqueColumns = this.repo.metadata.uniques.map(
      (e) => e.givenColumnNames[0]
    );
    this.logger.debug(this.isUnique.name, ' Unique Columns:', uniqueColumns);

    for (const u of uniqueColumns) {
      const count = await this.repo.count({ [u]: t[u] });
      this.logger.debug(this.isUnique.name, `unique count for ${u} = ${count}`);
      if (count > 0) {
        throw new UnprocessableEntityException(`${u} must be unique!`);
      }
    }
  }
  async columns() {
    const c = await this.repo.metadata.ownColumns
      .map((e) => e.propertyName)
      .sort();

    this.logger.debug(this.columns.name, c);
    return c;
  }

  async stream(res: Response) {
    const isDone = new BehaviorSubject<boolean>(false);
    const result = await this.repo.find();

    isDone.subscribe((r) => {
      if (r == true) {
        this.logger.debug(this.stream.name, 'Stream ended');
        res.end();
      }
    });

    for (let i = 0; i < result.length; i++) {
      const timeoutNumber = i > 20 ? 20 * 200 : i * 200;
      this.logger.debug(
        this.stream.name,
        `Timeout For Item : ${timeoutNumber}`
      );
      setTimeout(() => {
        const cdata = result[i];

        this.logger.debug(
          this.stream.name,
          `Writing data to response + ${cdata}`
        );

        res.write(JSON.stringify(cdata));
        if (i == result.length - 1) {
          isDone.next(true);
        }
      }, timeoutNumber);
    }
  }

  async find(options?: FindManyOptions) {
    this.logger.debug(this.find.name + ' options: ', options);

    const found = await this.repo.find(options);
    if (found) {
      return found;
    }
    throw new NotFoundException();
  }

  async findOne(options: FindOneOptions) {
    this.logger.debug(this.findOne.name + ' options: ', options);

    const found = await this.repo.findOne(options);
    if (found) {
      return found;
    }
    throw new NotFoundException();
  }

  async save(body: DeepPartial<T>) {
    this.logger.debug(this.save.name + ' body:', body);
    await this.isUnique(body);
    try {
      return await this.repo.save(body);
    } catch (err) {
      throw new UnprocessableEntityException(err.message);
    }
  }

  async delete(id: number) {
    this.logger.debug(this.delete.name + ' id:', id);
    try {
      const result = this.repo.softDelete(id);
      this.logger.debug(this.delete.name + ' result: ', result);
      return result;
    } catch (err) {
      throw new UnprocessableEntityException(err.message);
    }
  }

  async update(id: number, updated: QueryDeepPartialEntity<T>) {
    this.logger.debug(this.update.name + ' id & updated : ', id, updated);
    await this.isUnique(updated);
    try {
      const result = await this.repo.update(id, updated);
      this.logger.debug(this.update.name + ' result:', result);
      return result;
    } catch (err) {
      throw new UnprocessableEntityException(err.message);
    }
  }
}
