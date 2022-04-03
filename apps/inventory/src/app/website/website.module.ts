import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  FormModule,
  MaterialModule,
  NavigationModule,
} from '@projects/ui';

import { WebsiteComponent } from './website.component';

const routes: Routes = [{ path: '', component: WebsiteComponent }];
@NgModule({
  declarations: [WebsiteComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormModule,
    NavigationModule,
    RouterModule.forChild(routes),
  ],
})
export class WebsiteModule {}
