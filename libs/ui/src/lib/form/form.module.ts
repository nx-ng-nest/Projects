import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material';
import { FieldErrorsComponent } from './field-errors/field-errors.component';
import { FormFieldComponent } from './form-field/form-field.component';
import {
  FormSelectFieldComponent,
} from './form-select-field/form-select-field.component';
import {
  FormTextFieldComponent,
} from './form-text-field/form-text-field.component';
import { FormComponent } from './form.component';
import { SetAttributeDirective } from './set-attributes.directive';

@NgModule({
  declarations: [
    FormComponent,
    FormFieldComponent,
    SetAttributeDirective,
    FieldErrorsComponent,
    FormTextFieldComponent,
    FormSelectFieldComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [FormComponent],
})
export class FormModule {}
