import {
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatStep,
  MatStepper,
} from '@angular/material/stepper';

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
export class CreateComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('mainStep') mainStep!: MatStep;

  isMainCompleted = false;
  mainItem!: Record<string, any>;
  mainForm!: FormOptions;
  subForms!: FormOptions[];

  constructor(
    @Inject(CreateModuleTokens.FORM_OPTIONS) public formsOptions: FormOptions[],
    @Inject(CreateModuleTokens.RESOURCE_SERVICE)
    public resourceService: BaseCollectionService<any>
  ) {}

  ngOnInit(): void {
    this.mainForm = this.formsOptions[0];
    this.subForms = this.formsOptions.slice(1, this.formsOptions.length);
  }

  entries(formValue: Record<string, any>) {
    return Object.entries(formValue);
  }

  mainFormSubmitted(createdItem: FormComponentOutput) {
    this.mainItem = createdItem.formValue;

    console.log(this.mainItem);
    this.mainStep.editable = false;
    this.stepper.next();
    this.isMainCompleted = true;
  }
}
