import {
  EntityDataModuleConfig,
  EntityMetadataMap,
} from '@ngrx/data';
import { ICategory } from '@projects/interface';

const entityMetadata: EntityMetadataMap = {
  Category: {
    filterFn: (
      categorys: ICategory[],
      fnFunction: (e: ICategory) => boolean
    ) => {
      if (fnFunction) {
        return categorys?.filter(fnFunction);
      } else {
        return categorys;
      }
    },
  },
};

export const CATEGORY_PLURAL_NAME: Readonly<string> = 'Categories';

const pluralNames = {
  Category: CATEGORY_PLURAL_NAME,
};

export const categoryEntityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
