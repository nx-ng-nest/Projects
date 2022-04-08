import {
  EntityDataModuleConfig,
  EntityMetadataMap,
} from '@ngrx/data';
import {
  categoryEntityConfig,
  productEntityConfig,
} from '@projects/client-service';

const entityMetadata: EntityMetadataMap = {
  ...productEntityConfig.entityMetadata,
  ...categoryEntityConfig.entityMetadata,
};

const pluralNames = {
  ...productEntityConfig.pluralNames,
  ...categoryEntityConfig.pluralNames,
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
