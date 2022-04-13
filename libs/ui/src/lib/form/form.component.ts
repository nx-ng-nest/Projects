import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseCollectionService } from '@projects/client-service';

import { FormOptions } from './form';

@Component({
  selector: 'projects-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements AfterViewInit {
  @Input() formOptions!: FormOptions;
  @Input() resourceService!: BaseCollectionService<any>;
  @Output() readonly submitted = new EventEmitter<Record<string, any>>();

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = this.formOptions.formGroup;
    this.formOptions?.formFields
      .map((e) => {
        if (e.attributes.unique) {
          e.control.setAsyncValidators([
            this.resourceService.isFieldUnique(e.attributes.name, e.control),
          ]);
        }
        return { [e.attributes.name]: e.control };
      })
      .reduce((p, c) => ({ ...p, ...c }));
  }

  ngAfterViewInit(): void {
    (
      document.getElementsByClassName('mat-form-input')[0] as HTMLInputElement
    ).focus();
  }
  async submit() {
    this.submitted.emit(this.formGroup.value);
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
