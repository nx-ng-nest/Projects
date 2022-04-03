import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { NGXLogger } from 'ngx-logger';

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

  constructor(private logger: NGXLogger) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      this.formOptions.formFields
        .map((e) => ({ [e.name]: e.control }))
        .reduce((p, c) => ({ ...p, ...c }))
    );
  }

  submit() {
    this.logger.log(this.formGroup.value);
    this.submitted.emit(this.formGroup.value);
  }
}
