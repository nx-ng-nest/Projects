import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'projects-field-errors',
  templateUrl: './field-errors.component.html',
  styleUrls: ['./field-errors.component.scss'],
})
export class FieldErrorsComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() attributes!: Partial<HTMLInputElement>;
  constructor() {}

  ngOnInit(): void {}

  firstErrorKey() {
    const errors = this.control.errors;
    if (errors) {
      return Object.entries(errors)[0][0];
    }
    return null;
  }

  getErrorMsg(key: string) {
    if (this.control.errors) return this.control.errors[key];
    return '';
  }
}
