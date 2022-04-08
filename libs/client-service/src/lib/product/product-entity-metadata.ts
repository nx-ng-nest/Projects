import {
  EntityDataModuleConfig,
  EntityMetadataMap,
} from '@ngrx/data';
import { IProduct } from '@projects/interface';

const entityMetadata: EntityMetadataMap = {
  Product: {
    filterFn: (products: IProduct[], fnFunction: (e: IProduct) => boolean) => {
      if (fnFunction) {
        return products?.filter(fnFunction);
      } else {
        return products;
      }
    },
  },
};

const pluralNames = {
  Product: 'Products',
};

export const productEntityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
