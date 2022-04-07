import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { ProductService } from '@projects/client-service';
import { FormOptions } from '@projects/ui';

import { CreateModuleTokens } from '../../crud/create/create.module.tokens';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('product', {}),
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('../../crud/crud.module').then((m) => m.CrudModule),
      },
    ]),
  ],
  providers: [
    ProductService,
    {
      provide: CreateModuleTokens.RESOURCE_SERVICE,
      useClass: ProductService,
    },
    {
      provide: CreateModuleTokens.FORM_OPTIONS,
      useValue: [
        {
          name: 'Product',
          formFields: [
            {
              validators: [Validators.required],
              icon: 'info',
              label: 'Product Name',
              hint: 'Type a descriptive product name.',
              attributes: {
                name: 'name',
                required: true,
              },
            },
          ],
          submitLabel: 'Create Product',
        },

        {
          name: 'Features',
          formFields: [
            {
              attributes: { name: 'key', required: true },
              label: 'Feature Name',
              icon: 'key',
              hint: 'Type a feature name like color',
              validators: [Validators.required],
            },
            {
              attributes: { name: 'value', required: true },
              label: 'Feature Value',
              icon: 'document',
              hint: 'Type a feature value like red',
              validators: [Validators.required],
            },
          ],
        },
      ] as FormOptions[],
    },
  ],
})
export class ProductModule {}
