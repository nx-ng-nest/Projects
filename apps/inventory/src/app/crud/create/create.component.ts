import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';

import { slideInRightOnEnterAnimation } from 'angular-animations';

import { BaseCollectionService } from '@projects/client-service';
import {
  FormComponentOutput,
  FormOptions,
} from '@projects/ui';

import { CrudModuleTokens } from '../crud-tokens.enum';

@Component({
  selector: 'projects-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  animations: [slideInRightOnEnterAnimation({ anchor: 'enter' })],
})
export class CreateComponent implements OnInit {
  formOptions!: FormOptions;

  constructor(
    @Inject(CrudModuleTokens.RESOURCE_NAME) public resourceName: string,
    @Inject(CrudModuleTokens.FORM_OPTIONS)
    public readonly initFormOptions: (
      dataService: BaseCollectionService<any>
    ) => FormOptions,
    @Inject(CrudModuleTokens.DATA_SERVICE)
    public readonly resourceService: BaseCollectionService<any>
  ) {}

  ngOnInit(): void {
    this.formOptions = this.initFormOptions(this.resourceService);
  }

  entries(formValue: Record<string, any>) {
    return Object.entries(formValue);
  }

  formSubmitResult(createdItem: FormComponentOutput) {
    console.log(createdItem.formValue);
    const status = createdItem.formValue['error']['status'];
    const message1 = createdItem.formValue['error']['message'];
    const message2 = createdItem.formValue['message'];

    return;
  }
}
