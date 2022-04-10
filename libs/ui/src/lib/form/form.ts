import {
  FormControl,
  FormGroup,
} from '@angular/forms';

import { Observable } from 'rxjs';

export interface FormFieldSelectOption {
  value: string | number | boolean | undefined;
  label: string | undefined;
}

export interface FormField {
  unique?: boolean;
  label: string;
  hint?: string;
  icon: string;
  control: FormControl;
  default?: any;
  attributes: Partial<Omit<HTMLInputElement, 'name'>> & { name: string } & {
    unique?: boolean;
  };
  selectOptions?: Observable<FormFieldSelectOption[]> | undefined;
}

export interface FormOptions {
  name: string;
  submitLabel?: string;
  submitHandler?: (formValue: Record<string, any>) => void;
  formGroup: FormGroup;
  formFields: FormField[];
}
