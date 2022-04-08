import {
  EntityDataModuleConfig,
  EntityMetadataMap,
} from '@ngrx/data';
import { IFeature } from '@projects/interface';

const entityMetadata: EntityMetadataMap = {
  Feature: {
    filterFn: (features: IFeature[], fnFunction: (e: IFeature) => boolean) => {
      if (fnFunction) {
        return features?.filter(fnFunction);
      } else {
        return features;
      }
    },
  },
};

const pluralNames = {
  Feature: 'Features',
};

export const featureEntityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
