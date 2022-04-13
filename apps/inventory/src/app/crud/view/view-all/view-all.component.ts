import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { TableOptions } from '@projects/ui';

import { CrudModuleTokens } from '../../crud-tokens.enum';

@Component({
  selector: 'projects-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss'],
})
export class ViewAllComponent implements OnInit {
  constructor(
    @Inject(CrudModuleTokens.TABLE_OPTIONS)
    public tableOptions: TableOptions,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  handleActionClick(event: any) {
    console.log(`Action click event ${event}`);
  }

  handleEvents(event: { event: string; item?: Record<string, any> }) {
    console.log(event);
    if (event.event ==='dblclick', event.item) {
      this.router.navigate(['one',event?.item['uuid']], {
        relativeTo: this.route,
      });
    }
  }
}
