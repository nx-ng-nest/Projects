import {
  AfterViewInit,
  Component,
  Inject,
  ViewChild,
} from '@angular/core';
import {
  MatStep,
  MatStepper,
} from '@angular/material/stepper';

import { BehaviorSubject } from 'rxjs';

import { BaseCollectionService } from '@projects/client-service';
import {
  FormComponentOutput,
  FormOptions,
} from '@projects/ui';

import { CreateModuleTokens } from './create.module.tokens';

@Component({
  selector: 'projects-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements AfterViewInit {
  reRender$ = new BehaviorSubject(true);

  @ViewChild('stepper') stepper!: MatStepper;

  constructor(
    @Inject(CreateModuleTokens.FORM_OPTIONS) public formsOptions: FormOptions[],
    @Inject(CreateModuleTokens.RESOURCE_SERVICE)
    public resourceService: BaseCollectionService<any>
  ) {}

  ngAfterViewInit(): void {}

  entries(formValue: Record<string, any>) {
    return Object.entries(formValue);
  }

  formSubmitResult(createdItem: FormComponentOutput, step: MatStep) {
    if (createdItem.error) {
      console.log(createdItem.formValue);
      const status = createdItem.formValue['error']['status'];
      const message1 = createdItem.formValue['error']['message'];
      const message2 = createdItem.formValue['message'];

      return;
    } else {
      step.editable = false;
      step.completed = true;
      this.stepper.next();
    }
  }

  reset() {
    for (const e of this.formsOptions) {
      e.formGroup.reset();
    }
    this.stepper.reset();
    this.reRender$.next(false);

    setTimeout(() => {
      this.reRender$.next(true);
    }, 2000);
  }
}
