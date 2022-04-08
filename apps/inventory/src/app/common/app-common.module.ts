import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

import { HttpErrorComponent } from './http-error/http-error.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './notification/notification.service';

@NgModule({
  declarations: [NavItemComponent, HttpErrorComponent, NotificationComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatSnackBarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [NotificationService],
  exports: [NavItemComponent, HttpErrorComponent, NotificationComponent],
})
export class AppCommonModule {}
