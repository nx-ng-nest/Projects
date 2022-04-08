import {
  EntityDataModuleConfig,
  EntityMetadataMap,
} from '@ngrx/data';
import { ISale } from '@projects/interface';

const entityMetadata: EntityMetadataMap = {
  Sale: {
    filterFn: (sales: ISale[], fnFunction: (e: ISale) => boolean) => {
      if (fnFunction) {
        return sales?.filter(fnFunction);
      } else {
        return sales;
      }
    },
  },
};

const pluralNames = {
  Sale: 'Sales',
};

export const saleEntityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
