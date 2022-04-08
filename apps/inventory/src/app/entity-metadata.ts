import {
  EntityDataModuleConfig,
  EntityMetadataMap,
} from '@ngrx/data';
import {
  categoryEntityConfig,
  featureEntityConfig,
  messageEntityConfig,
  productdetailEntityConfig,
  productEntityConfig,
  saleEntityConfig,
  storeEntityConfig,
  taskEntityConfig,
  userEntityConfig,
} from '@projects/client-service';

const entityMetadata: EntityMetadataMap = {
  ...productEntityConfig.entityMetadata,
  ...categoryEntityConfig.entityMetadata,
  ...featureEntityConfig.entityMetadata,
  ...messageEntityConfig.entityMetadata,
  ...productdetailEntityConfig.entityMetadata,
  ...saleEntityConfig.entityMetadata,
  ...storeEntityConfig.entityMetadata,
  ...taskEntityConfig.entityMetadata,
  ...userEntityConfig.entityMetadata,
};

const pluralNames = {
  ...productEntityConfig.pluralNames,
  ...categoryEntityConfig.pluralNames,
  ...featureEntityConfig.pluralNames,
  ...messageEntityConfig.pluralNames,
  ...productdetailEntityConfig.pluralNames,
  ...saleEntityConfig.pluralNames,
  ...storeEntityConfig.pluralNames,
  ...taskEntityConfig.pluralNames,
  ...userEntityConfig.pluralNames,
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
