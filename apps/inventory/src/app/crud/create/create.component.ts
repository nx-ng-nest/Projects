import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
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
export class CreateComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('mainStep') mainStep!: MatStep;

  mainForm!: FormOptions;
  subForms!: FormOptions[];

  constructor(
    @Inject(CreateModuleTokens.FORM_OPTIONS) public formsOptions: FormOptions[],
    @Inject(CreateModuleTokens.RESOURCE_SERVICE)
    public resourceService: BaseCollectionService<any>,
    public matSnackBar: MatSnackBar,
    public matDialog: MatDialog
  ) {}
  ngAfterViewInit(): void {
    const i = new BehaviorSubject(1);
  }

  ngOnInit(): void {
    this.mainForm = this.formsOptions[0];
    this.subForms = this.formsOptions.slice(1, this.formsOptions.length);
  }

  entries(formValue: Record<string, any>) {
    return Object.entries(formValue);
  }

  formSubmitResult(createdItem: FormComponentOutput, step: MatStep) {
    if (createdItem.error) {
      const status = createdItem.formValue['error']['status'];
      const message = createdItem.formValue['error']['message'];
      this.matDialog.open(HttpErrorComponent, { data: { status, message } });
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
}
