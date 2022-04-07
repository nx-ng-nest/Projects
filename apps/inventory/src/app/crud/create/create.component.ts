import {
  Component,
  Inject,
} from '@angular/core';

import { BaseCollectionService } from '@projects/client-service';
import { FormOptions } from '@projects/ui';

import { CreateModuleTokens } from './create.module.tokens';

@Component({
  selector: 'projects-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  constructor(
    @Inject(CreateModuleTokens.FORM_OPTIONS) public formsOptions: FormOptions[],
    @Inject(CreateModuleTokens.RESOURCE_SERVICE)
    public resourceService: BaseCollectionService<any>
  ) {}
}
