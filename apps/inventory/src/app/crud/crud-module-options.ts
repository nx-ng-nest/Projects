import { CanActivate } from '@angular/router';

import { ClassConstructor } from 'class-transformer';

import { BaseCollectionService } from '@projects/client-service';
import { ICommonFields } from '@projects/interface';
import {
  FormOptions,
  TableOptions,
} from '@projects/ui';

export interface CrudModuleOptions<T extends ICommonFields = any> {
  dataService: ClassConstructor<BaseCollectionService<T>>;
  formOptions: (dataService: BaseCollectionService<T>) => FormOptions;
  guard: ClassConstructor<CanActivate>;
  tableOptions: TableOptions;
}
