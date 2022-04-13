import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';

import { CrudModuleTokens } from '../crud-tokens.enum';

@Component({
  selector: 'projects-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  constructor(
    @Inject(CrudModuleTokens.RESOURCE_NAME) public resourceName: string
  ) {}

  ngOnInit(): void {}
}
