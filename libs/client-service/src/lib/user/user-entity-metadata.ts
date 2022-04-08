import {
  EntityDataModuleConfig,
  EntityMetadataMap,
} from '@ngrx/data';
import { IUser } from '@projects/interface';

const entityMetadata: EntityMetadataMap = {
  User: {
    filterFn: (users: IUser[], fnFunction: (e: IUser) => boolean) => {
      if (fnFunction) {
        return users?.filter(fnFunction);
      } else {
        return users;
      }
    },
  },
};

const pluralNames = {
  User: 'Users',
};

export const userEntityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
