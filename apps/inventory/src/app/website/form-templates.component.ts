import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';

export interface FormFieldContext {
  control?: FormControl;
  attributes?: Partial<HTMLInputElement>;
  label?: string;
  icon?: string;
  selectOptions?: { value?: any; label?: string }[];
}
@Component({
  selector: 'form-field',
  templateUrl: './form-field-template.component.html',
})
export class FormFieldTemplateComponent implements OnInit {
  @Input() context: FormFieldContext = {};

  constructor() {}
  ngOnInit() {}

  getType() {
    return this.context.attributes?.type || 'text';
  }
}
