import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { firstValueFrom } from 'rxjs';

import { BaseCollectionService } from '@projects/client-service';

import { FormOptions } from './form';

export interface FormComponentOutput<T = Record<string, any>> {
  formName: string;
  formValue: T;
}

@Component({
  selector: 'projects-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input() formOptions!: FormOptions;
  @Input() resourceService!: BaseCollectionService<any>;
  @Output() readonly submitted = new EventEmitter<FormComponentOutput>();

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = this.formOptions.formGroup;
    this.formOptions?.formFields
      .map((e) => {
        if (e.attributes.unique) {
          e.control.setAsyncValidators([
            this.resourceService.validateUnique(e.attributes.name, e.control),
          ]);
        }
        return { [e.attributes.name]: e.control };
      })
      .reduce((p, c) => ({ ...p, ...c }));

    this.formGroup.valueChanges.subscribe((d) =>
      console.log(this.formGroup.pending)
    );
  }

  async submit() {
    const result = this.resourceService.add(this.formGroup.value);

    this.submitted.emit({
      formName: this.formOptions.name,
      formValue: await firstValueFrom(result),
    });
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
