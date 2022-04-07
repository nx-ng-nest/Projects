import {
  Component,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormField } from '../form';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'form-field',
  templateUrl: './form-field-template.component.html',
  styleUrls: ['../form.component.scss'],
})
export class FormFieldComponent {
  @Input() formField!: FormField;

  getType() {
    return this.formField.attributes?.type || 'text';
  }

  iconColor(control: FormControl) {
    return control?.untouched
      ? 'primary'
      : control?.valid || control?.pending
      ? 'primary'
      : 'accent';
  }

  getFirstError(errors: Record<string, any>) {
    return Object.keys(errors)[0];
  }
}
