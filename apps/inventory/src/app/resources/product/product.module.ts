import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { ProductService } from '@projects/client-service';
import { TableModuleTokens } from '@projects/ui';

import { CrudComponent } from '../../crud/crud.component';
import { CrudModule } from '../../crud/crud.module';
import { initFormOptions } from './product-form-options';
import { ProductGuard } from './product.guard';

const productColumns = [
  'selected',
  'id',
  'uuid',
  'name',
  'description',
  'id1',
  'id2',
  'id3',
  'createdAt',
  'updatedAt',
  'deletedAt',
  'active',
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('product', {}),
    CrudModule.register({
      resourceName: 'Product',
      dataService: ProductService,
      formOptions: initFormOptions,
      guard: ProductGuard,
      tableOptions: {
        columns: productColumns,
        displayedColumns: ['selected', 'uuid', 'name', 'description', 'active'],
        searchableColumns: productColumns,
        tableActions: [
          {
            label: 'Create Product',
            icon: 'add',
            path: '../create',
          },
        ],
      },
      toolbarOptions: {
        pageName: 'Product',
        toolbarItems: [
          { path: '', label: 'Item 1', icon: 'add' },
          { path: '', label: 'Item 1', icon: 'edit' },
          { path: '', label: 'Item 1', icon: 'delete' },
          { path: '', label: 'Item 1', icon: 'view_list' },
        ],
      },

      createToolbarOptions: {
        pageName: 'Create Product',
        toolbarItems: [{ path: '', label: 'Item 1', icon: 'add' }],
      },
      updateToolbarOptions: {
        pageName: 'Update Product',
        toolbarItems: [{ path: '', label: 'Item 1', icon: 'edit' }],
      },
      deleteToolbarOptions: {
        pageName: 'Delete Product',
        toolbarItems: [{ path: '', label: 'Item 1', icon: 'delete' }],
      },
      viewToolbarOptions: {
        pageName: 'View Product',
        toolbarItems: [{ path: '', label: 'Item 1', icon: 'view_list' }],
      },
    }),
    RouterModule.forChild([
      {
        path: '',
        component: CrudComponent,
      },
    ]),
  ],
  providers: [
    ProductService,
    ProductGuard,
    {
      provide: TableModuleTokens.TABLE_MODULE_DATA_SERVICE,
      useClass: ProductService,
    },
  ],
})
export class ProductModule {}
