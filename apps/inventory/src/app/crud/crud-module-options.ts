import { CanActivate } from '@angular/router';

import { ClassConstructor } from 'class-transformer';

import { BaseCollectionService } from '@projects/client-service';
import { ICommonFields } from '@projects/interface';
import {
  FormOptions,
  TableOptions,
} from '@projects/ui';

import { CrudToolbarOptions } from './crud-toolbar/crud-toolbar-options';

export interface CrudModuleOptions<T extends ICommonFields = any> {
  resourceName: string;
  dataService: ClassConstructor<BaseCollectionService<T>>;
  formOptions: (dataService: BaseCollectionService<T>) => FormOptions;
  guard: ClassConstructor<CanActivate>;
  tableOptions: TableOptions;
  createToolbarOptions?: CrudToolbarOptions;
  updateToolbarOptions?: CrudToolbarOptions;
  deleteToolbarOptions?: CrudToolbarOptions;
  viewToolbarOptions?: CrudToolbarOptions;
}
