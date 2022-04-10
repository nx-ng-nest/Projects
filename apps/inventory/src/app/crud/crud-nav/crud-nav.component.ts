import {
  Component,
  Inject,
  Optional,
} from '@angular/core';

import { UserCanActivate } from '../user-can-activate.guard';

@Component({
  selector: 'projects-crud-nav',
  templateUrl: './crud-nav.component.html',
  styleUrls: ['./crud-nav.component.scss'],
})
export class CrudNavComponent {
  constructor(
    @Optional() @Inject(UserCanActivate) public user?: UserCanActivate
  ) {}
}
