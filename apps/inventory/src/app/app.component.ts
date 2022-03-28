import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppUpState } from './app-store';

@Component({
  selector: 'projects-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'inventory';

  constructor(private store: Store<AppUpState>) {
    this.store.subscribe(console.log);
  }
}
