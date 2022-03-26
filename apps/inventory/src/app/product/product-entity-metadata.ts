import {
  EntityDataModuleConfig,
  EntityMetadataMap,
} from '@ngrx/data';

import { Product } from './product.entity';

const entityMetadata: EntityMetadataMap = {
  Product: {
    filterFn: (products: Product[], fnFunction: (e: Product) => boolean) => {
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
