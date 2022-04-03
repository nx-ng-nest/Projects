import { FormControl } from '@angular/forms';

export interface FormFieldSelectOption {
  value: string;
  label: string;
}
export interface FormField {
  name: string;
  label: string;
  icon: string;
  control: FormControl;
  attributes: Partial<HTMLInputElement>;
  selectOptions?: FormFieldSelectOption[];
}

export interface FormOptions {
  name: string;
  submitLabel: string;
  formFields: FormField[];
}
