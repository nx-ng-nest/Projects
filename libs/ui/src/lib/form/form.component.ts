import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';

import { FormOptions } from './form';

@Component({
  selector: 'projects-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input() formOptions: FormOptions = {
    formFields: [
      {
        attributes: {},
        control: new FormControl(''),
        icon: 'info',
        label: 'Form Label',
      },
    ],
    submitHandler: (value) => console.log(value),
    name: 'Form Name (formOptions.name)',
    submitLabel: 'Submit Label (formOptions.submitLabel)',
  };

  @Output() readonly submitted = new EventEmitter<Record<string, any>>();
  @Input() formGroup!: FormGroup;

  ngOnInit(): void {
    if (!this.formGroup)
      this.formGroup = new FormGroup(
        this.formOptions?.formFields
          .map((e) => ({ [e.attributes.name as string]: e.control }))
          .reduce((p, c) => ({ ...p, ...c }))
      );
  }

  submit() {
    this.submitted.emit(this.formGroup.value);
    if (this.formOptions?.submitHandler) {
      this.formOptions.submitHandler(this.formGroup.value);
    }
    this.reset();
  }

  reset() {
    this.formGroup.reset();
    this.formGroup.setErrors(null);
    this.formGroup.clearValidators();
    this.formGroup.markAsUntouched();

    for (const c of this.formOptions.formFields) {
      this.formGroup.controls[c.attributes.name as string].setErrors(null);
    }
  }
}
