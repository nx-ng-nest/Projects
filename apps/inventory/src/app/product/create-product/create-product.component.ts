import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  ICategory,
  IProduct,
} from '@projects/interface';
import {
  FormFieldSelectOption,
  FormOptions,
} from '@projects/ui';

@Component({
  selector: 'projects-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  createFormValue: Partial<IProduct<ICategory>> = {};

  categories: FormFieldSelectOption[] = [
    { label: 'Electronics', value: '1' },
    { label: 'Plush', value: '2' },
    { label: 'Console', value: '3' },
  ];

  productFeatures: Record<string, string>[] = [];

  createProductFormOptions: FormOptions = {
    formFields: [
      {
        attributes: {
          name: 'uuid',
          type: 'text',
          autocomplete: 'off',
          required: true,
        },
        control: new FormControl('', [Validators.required]),
        icon: 'qr_code_2',
        label: 'UUID',
        hint: 'Product barcode.',
      },
      {
        attributes: {
          name: 'name',
          type: 'text',
          autocomplete: 'off',
          required: true,
        },
        control: new FormControl('', []),
        icon: 'info',
        label: 'Name',
        hint: 'Name and unique features.',
      },
      {
        attributes: {
          name: 'description',
          type: 'text',
          autocomplete: 'off',
          required: true,
        },
        control: new FormControl('', []),
        icon: 'info',
        label: 'Description',
        hint: 'Type description and remarkable features.',
      },
      {
        attributes: {
          name: 'categories',
          type: 'select',
          multiple: true,
          autocomplete: 'off',
          required: true,
        },
        control: new FormControl('', []),
        icon: 'category',
        label: 'Categories',
        selectOptions: this.categories,
        hint: 'Select the category to which the product belongs. Or, create a new one',
      },
    ],
    name: 'Create Product',
  };

  createProductFormGroup = new FormGroup(
    this.createProductFormOptions?.formFields
      .map((e) => ({ [e.attributes.name as string]: e.control }))
      .reduce((p, c) => ({ ...p, ...c }))
  );

  createProductFeaturesOptions: FormOptions = {
    name: 'Product Features',
    submitLabel: 'Add Feature',
    formFields: [
      {
        attributes: {
          name: 'key',
          type: 'text',
          autocomplete: 'off',
          required: true,
        },
        control: new FormControl('', [Validators.required]),
        icon: 'key',
        label: 'Key',
      },
      {
        attributes: {
          name: 'value',
          type: 'text',
          autocomplete: 'off',
          required: true,
        },
        control: new FormControl('', [Validators.required]),
        icon: 'description',
        label: 'Value',
      },
    ],
  };

  createProductFeaturesFormGroup = new FormGroup(
    this.createProductFeaturesOptions?.formFields
      .map((e) => ({ [e.attributes.name as string]: e.control }))
      .reduce((p, c) => ({ ...p, ...c }))
  );

  isAddFeature = false;
  constructor() {}

  ngOnInit(): void {}

  addFeature(feature: Record<string, string>) {
    this.productFeatures.push(feature);
  }
}
