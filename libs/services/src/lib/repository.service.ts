import {
  DeepPartial,
  Repository,
} from 'typeorm';

export class RepositoryService<T, DTO, FindManyOptions> {
  constructor(private readonly repo: Repository<T>) {}

  getAll(query: Record<string, unknown>) {
    return this.repo.find(query);
  }

  getAllWithQuery(query: FindManyOptions) {
    return this.repo.find(query);
  }

  getById(id: number) {
    return this.repo.findOne(id);
  }

  createOne(body: DeepPartial<T>) {
    return this.repo.save(body);
  }

  patchOne(id: number, body: DTO) {
    return this.repo.update(id, body);
  }

  deleteOne(id: number) {
    return this.repo.delete(id);
  }
}
