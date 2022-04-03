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

export interface FormAction<RType = any> {
  handler: (formValue: Record<string, any>) => RType;
  label: string;
  color?: 'primary' | 'accent' | 'warn';
}

export interface FormOptions<HandlerRType = any> {
  name: string;
  formFields: FormField[];
  actionButtons: FormAction<HandlerRType>[];
}
