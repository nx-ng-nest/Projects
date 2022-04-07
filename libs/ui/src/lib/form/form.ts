import {
  FormControl,
  FormGroup,
} from '@angular/forms';

import { BaseCollectionService } from '@projects/client-service';

export interface FormFieldSelectOption {
  value: string;
  label: string;
}

type GetSelectOptions = <T>(
  dataService: BaseCollectionService<T>
) => Promise<FormFieldSelectOption[]>;

export interface FormField {
  unique?: boolean;
  label: string;
  hint?: string;
  icon: string;
  control: FormControl;
  default?: any;
  attributes: Partial<Omit<HTMLInputElement, 'name'>> & { name: string } & {
    unique: boolean;
  };
  selectOptions?: FormFieldSelectOption[];
}

export interface FormOptions {
  name: string;
  submitLabel?: string;
  submitHandler?: (formValue: Record<string, any>) => void;
  formGroup: FormGroup;
  formFields: FormField[];
}
