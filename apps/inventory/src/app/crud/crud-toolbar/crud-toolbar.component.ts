import {
  Component,
  Inject,
} from '@angular/core';

import { CrudModuleTokens } from '../crud-tokens.enum';
import { CrudToolbarOptions } from './crud-toolbar-options';

@Component({
  selector: 'projects-crud-toolbar',
  templateUrl: './crud-toolbar.component.html',
  styleUrls: ['./crud-toolbar.component.scss'],
})
export class CrudToolbarComponent {
  constructor(
    @Inject(CrudModuleTokens.RESOURCE_NAME) public title: string,
    @Inject(CrudModuleTokens.TOOLBAR_OPTIONS)
    public toolbarOptions: CrudToolbarOptions
  ) {

    console.log('Toolbar Options', toolbarOptions)
  }
}
