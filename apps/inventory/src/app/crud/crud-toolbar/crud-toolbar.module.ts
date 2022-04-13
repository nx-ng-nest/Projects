import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { CrudToolbarComponent } from './crud-toolbar.component';

@NgModule({
  declarations: [CrudToolbarComponent],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild([{ path: '', component: CrudToolbarComponent }]),
  ],
})
export class CrudToolbarModule {}
