import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { slideInRightOnEnterAnimation } from 'angular-animations';
import { firstValueFrom } from 'rxjs';

import { MergeStrategy } from '@ngrx/data';
import { BaseCollectionService } from '@projects/client-service';
import { FormOptions } from '@projects/ui';

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
    public readonly resourceService: BaseCollectionService<any>,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.formOptions = this.initFormOptions(this.resourceService);
  }

  entries(formValue: Record<string, any>) {
    return Object.entries(formValue);
  }

  async formSubmitResult(formValue: Record<string, any>) {
    await firstValueFrom(
      this.resourceService.add(formValue, {
        mergeStrategy: MergeStrategy.OverwriteChanges,
      })
    );
  }
}
