import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

import { NavItemComponent } from './nav-item/nav-item.component';

@NgModule({
  declarations: [NavItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  exports: [NavItemComponent],
})
export class AppCommonModule {}
