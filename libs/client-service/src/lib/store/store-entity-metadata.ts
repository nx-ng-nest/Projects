import {
  EntityDataModuleConfig,
  EntityMetadataMap,
} from '@ngrx/data';
import { IStore } from '@projects/interface';

const entityMetadata: EntityMetadataMap = {
  Store: {
    filterFn: (stores: IStore[], fnFunction: (e: IStore) => boolean) => {
      if (fnFunction) {
        return stores?.filter(fnFunction);
      } else {
        return stores;
      }
    },
  },
};

const pluralNames = {
  Store: 'Stores',
};

export const storeEntityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
