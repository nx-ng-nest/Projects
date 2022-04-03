import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormOptions } from './form';

@Component({
  selector: 'projects-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() formOptions!: FormOptions;
  @Output() readonly submitted = new EventEmitter<Record<string, any>>();
  formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      this.formOptions.formFields
        .map((e) => ({ [e.name]: e.control }))
        .reduce((p, c) => ({ ...p, ...c }))
    );
  }

  submit() {
    this.submitted.emit(this.formGroup.value);
  }
}
