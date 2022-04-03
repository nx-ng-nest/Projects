import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material';
import { FormFieldComponent } from './form-field.component';
import { FormComponent } from './form.component';
import { SetAttributeDirective } from './set-attributes.directive';

@NgModule({
  declarations: [FormComponent, FormFieldComponent, SetAttributeDirective],
  imports: [CommonModule, MaterialModule],
  exports: [FormComponent],
})
export class FormModule {}
