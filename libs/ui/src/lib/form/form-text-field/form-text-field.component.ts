import { Component } from '@angular/core';

import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'projects-form-text-field',
  templateUrl: './form-text-field.component.html',
  styleUrls: ['./form-text-field.component.scss'],
})
export class FormTextFieldComponent extends FormFieldComponent {}
