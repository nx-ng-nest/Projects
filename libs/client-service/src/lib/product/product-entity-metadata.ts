import {
  EntityDataModuleConfig,
  EntityMetadataMap,
} from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Product: {},
};

const pluralNames = {
  Product: 'Products',
};

export const productEntityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
