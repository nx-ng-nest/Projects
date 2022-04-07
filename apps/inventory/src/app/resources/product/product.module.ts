import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { StoreModule } from '@ngrx/store';
import { ProductService } from '@projects/client-service';
import { FormOptions } from '@projects/ui';

import { LocalStoreService } from '../../common/localstore.service';
import { CreateModuleTokens } from '../../crud/create/create.module.tokens';

const productForm = {
  uuid: new FormControl('', [Validators.required, Validators.minLength(10)]),
  name: new FormControl('', [Validators.required]),
  description: new FormControl('', [Validators.required]),
  categories: new FormControl('', []),
};

const featureForm = {
  key: new FormControl('', Validators.required),
  value: new FormControl('', Validators.required),
};

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
          name: 'product',
          submitLabel: 'Save Product',
          formGroup: new FormGroup(productForm),
          formFields: [
            {
              icon: 'key',
              label: 'Barcode',
              hint: 'Type a barcode.',
              attributes: {
                name: 'uuid',
                required: true,
                autocomplete: 'off',
                unique: true,
              },
              control: productForm.uuid,
            },
            {
              icon: 'info',
              label: 'Product Name',
              hint: 'Type a descriptive product name.',
              attributes: {
                name: 'name',
                required: true,
                autocomplete: 'off',
              },
              control: productForm.name,
            },
            {
              icon: 'description',
              label: 'Product Description',
              hint: 'Type a product description.',
              attributes: {
                name: 'description',
                required: true,
                autocomplete: 'off',
              },
              control: productForm.description,
            },
            {
              icon: 'category',
              label: 'Categories',
              hint: 'Select Categories.',
              attributes: {
                name: 'categories',
                type: 'select',
                multiple: true,
              },
              control: productForm.description,
              selectOptions: LocalStoreService.categories().map((e) => ({
                label: e.name,
                value: e.id,
              })),
            },
          ],
        },

        {
          name: 'Features',
          formGroup: new FormGroup(featureForm),
          formFields: [
            {
              attributes: { name: 'key', required: true, autocomplete: 'off' },
              label: 'Feature Name',
              icon: 'key',
              hint: 'Type a feature name like color',
              control: featureForm.key,
            },
            {
              attributes: {
                name: 'value',
                required: true,
                autocomplete: 'off',
              },
              label: 'Feature Value',
              icon: 'description',
              hint: 'Type a feature value like red',
              control: featureForm.value,
            },
          ],
        },
      ] as FormOptions[],
    },
  ],
})
export class ProductModule {
  constructor(productService: ProductService) {
    firstValueFrom(productService.getAll()).then().catch(console.log);
  }
}
