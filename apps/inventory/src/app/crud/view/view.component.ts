import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { TableOptions } from '@projects/ui';

import { CrudModuleTokens } from '../crud-tokens.enum';

@Component({
  selector: 'projects-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject(CrudModuleTokens.TABLE_OPTIONS)
    public tableOptions: TableOptions
  ) {}

  ngOnInit(): void {}
}
