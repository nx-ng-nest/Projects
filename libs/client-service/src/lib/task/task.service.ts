import { Injectable } from '@angular/core';

import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { ITask } from '@projects/interface';

import { BaseCollectionService } from '../base';

@Injectable({ providedIn: 'root' })
export class TaskService extends BaseCollectionService<ITask> {
  constructor(elementFactory: EntityCollectionServiceElementsFactory) {
    super('Task', elementFactory);
  }
}
