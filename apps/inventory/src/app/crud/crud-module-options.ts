import { ClassConstructor } from 'class-transformer';

import { BaseCollectionService } from '@projects/client-service';
import { ICommonFields } from '@projects/interface';
import { FormOptions } from '@projects/ui';

export interface CrudModuleOptions<T extends ICommonFields = any> {
  dataService: ClassConstructor<BaseCollectionService<T>>;
  initFormOptions: (dataService: BaseCollectionService<T>) => FormOptions;
}
