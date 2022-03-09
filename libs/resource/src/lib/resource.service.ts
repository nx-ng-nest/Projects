import {
  DeepPartial,
  Repository,
} from 'typeorm';
import {
  QueryDeepPartialEntity,
} from 'typeorm/query-builder/QueryPartialEntity';

export class ResourceService<
  Entity = unknown,
  DTO extends DeepPartial<Entity> = any
> {
  constructor(private readonly repo: Repository<Entity>) {}

  async findAll(page: number, query: string, take = 20): Promise<Entity[]> {
    page = page > 0 ? page : 1;
    const skip = (page - 1) * 20;

    if (query && query.trim().length > 0) {
      const founds = await this.repo.find();
      const filteredData = founds.filter((e) =>
        JSON.stringify(e).toLowerCase().includes(query.trim().toLowerCase())
      );

      return filteredData.slice(skip, skip + take);
    }
    return await this.repo.find({
      take,
      skip,
    });
  }

  findById(id: number) {
    return this.repo.findOne(id);
  }

  createOne(body: DTO) {
    return this.repo.save(body);
  }

  updateOne(id: number, body: QueryDeepPartialEntity<Entity>) {
    return this.repo.update(id, body);
  }

  deleteOne(id: number) {
    return this.repo.delete(id);
  }
}
