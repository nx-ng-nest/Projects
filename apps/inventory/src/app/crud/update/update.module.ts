import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { UpdateComponent } from './update.component';

const routes: Routes = [{ path: '', component: UpdateComponent }];

@NgModule({
  declarations: [UpdateComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UpdateModule {}
