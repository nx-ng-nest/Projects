import {
  Component,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'projects-http-error',
  templateUrl: './http-error.component.html',
})
export class HttpErrorComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { status: string | number; messages: string[] }
  ) {}
}
