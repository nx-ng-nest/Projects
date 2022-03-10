import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@projects/services';
import { FindManyOptions } from '@projects/utils';

import { NoteDTO } from './note.dto';
import { Note } from './note.entity';

export class NoteService extends RepositoryService<
  Note,
  NoteDTO,
  FindManyOptions
> {
  constructor(
    @InjectRepository(Note) private readonly noteRepo: Repository<Note>
  ) {
    super(noteRepo);
  }
}
