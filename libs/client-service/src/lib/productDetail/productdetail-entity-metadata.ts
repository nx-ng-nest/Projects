import {
  EntityDataModuleConfig,
  EntityMetadataMap,
} from '@ngrx/data';
import { IProductDetail } from '@projects/interface';

const entityMetadata: EntityMetadataMap = {
  ProductDetail: {
    filterFn: (productdetails: IProductDetail[], fnFunction: (e: IProductDetail) => boolean) => {
      if (fnFunction) {
        return productdetails?.filter(fnFunction);
      } else {
        return productdetails;
      }
    },
  },
};

const pluralNames = {
  ProductDetail: 'ProductDetails',
};

export const productdetailEntityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
