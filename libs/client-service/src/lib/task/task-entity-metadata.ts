import {
  EntityDataModuleConfig,
  EntityMetadataMap,
} from '@ngrx/data';
import { ITask } from '@projects/interface';

const entityMetadata: EntityMetadataMap = {
  Task: {
    filterFn: (tasks: ITask[], fnFunction: (e: ITask) => boolean) => {
      if (fnFunction) {
        return tasks?.filter(fnFunction);
      } else {
        return tasks;
      }
    },
  },
};

const pluralNames = {
  Task: 'Tasks',
};

export const taskEntityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
