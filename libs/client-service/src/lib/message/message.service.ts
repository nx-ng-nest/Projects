import { Injectable } from '@angular/core';

import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { IMessage } from '@projects/interface';

import { BaseCollectionService } from '../base';

@Injectable({ providedIn: 'root' })
export class MessageService extends BaseCollectionService<IMessage> {
  constructor(elementFactory: EntityCollectionServiceElementsFactory) {
    super('Message', elementFactory);
  }
}
