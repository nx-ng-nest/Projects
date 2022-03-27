import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'projects-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'inventory';

  constructor(private store: Store) {
    this.store.subscribe(console.log);
  }
}
