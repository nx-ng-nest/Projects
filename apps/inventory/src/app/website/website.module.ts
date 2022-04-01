import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  MaterialModule,
  NavigationModule,
} from '@projects/ui';

import { FormFieldTemplateComponent } from './form-templates.component';
import {
  SetAttributeDirective,
  WebsiteComponent,
} from './website.component';

const routes: Routes = [{ path: '', component: WebsiteComponent }];
@NgModule({
  declarations: [WebsiteComponent, SetAttributeDirective, FormFieldTemplateComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NavigationModule,
    RouterModule.forChild(routes),
  ],
})
export class WebsiteModule {}
