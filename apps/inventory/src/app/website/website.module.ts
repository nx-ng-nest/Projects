import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteComponent } from './website.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule, NavigationStoreModule } from '@projects/ui';

const routes: Routes = [{ path: '', component: WebsiteComponent }];
@NgModule({
  declarations: [WebsiteComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NavigationStoreModule,
    RouterModule.forChild(routes),
  ],
})
export class WebsiteModule {}
