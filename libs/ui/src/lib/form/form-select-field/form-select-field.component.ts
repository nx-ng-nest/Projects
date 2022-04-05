import { Component } from '@angular/core';

import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'projects-form-select-field',
  templateUrl: './form-select-field.component.html',
  styleUrls: ['./form-select-field.component.scss'],
})
export class FormSelectFieldComponent extends FormFieldComponent {}
