import {
  EntityDataModuleConfig,
  EntityMetadataMap,
} from '@ngrx/data';
import { productEntityConfig } from '@projects/client-service';

const entityMetadata: EntityMetadataMap = {
  ...productEntityConfig.entityMetadata,
};

const pluralNames = {
  ...productEntityConfig.pluralNames,
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
