import {
  AfterViewInit,
  Component,
  Inject,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

import {
  HttpErrorComponent,
} from '../../common/http-error/http-error.component';
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
    public resourceService: BaseCollectionService<any>,
    public matSnackBar: MatSnackBar,
    public matDialog: MatDialog
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
      this.matDialog.open(HttpErrorComponent, {
        data: { status, messages: [message1, message2] },
      });
      return;
    } else {
      this.matSnackBar.open('Form is submitted.', '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });

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
