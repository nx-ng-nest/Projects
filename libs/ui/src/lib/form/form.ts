import { FormControl } from '@angular/forms';

export interface FormFieldSelectOption {
  value: string;
  label: string;
}
export interface FormField {
  label: string;
  hint?: string;
  icon: string;
  control: FormControl;
  attributes: Partial<HTMLInputElement>;
  selectOptions?: FormFieldSelectOption[];
}

export interface FormOptions {
  name: string;
  submitLabel?: string;
  submitHandler?: (formValue: Record<string, any>) => void;
  formFields: FormField[];
}
