import {
  EntityDataModuleConfig,
  EntityMetadataMap,
} from '@ngrx/data';
import { IMessage } from '@projects/interface';

const entityMetadata: EntityMetadataMap = {
  Message: {
    filterFn: (messages: IMessage[], fnFunction: (e: IMessage) => boolean) => {
      if (fnFunction) {
        return messages?.filter(fnFunction);
      } else {
        return messages;
      }
    },
  },
};

const pluralNames = {
  Message: 'Messages',
};

export const messageEntityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
