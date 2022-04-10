import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormControlStatus,
} from '@angular/forms';

import {
  debounceTime,
  map,
  merge,
  Observable,
} from 'rxjs';

@Component({
  selector: 'projects-field-status',
  templateUrl: './field-status.component.html',
})
export class FieldStatusComponent implements OnInit {
  @Input() control!: FormControl;

  status$!: Observable<FormControlStatus>;

  ngOnInit(): void {
    this.status$ = merge(
      this.control.statusChanges.pipe<FormControlStatus>(debounceTime(1000)),
      this.control.valueChanges.pipe<FormControlStatus>(map((_) => 'PENDING'))
    );
  }

  clearControl() {
    this.control.reset();
  }
}
