import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';

import { NavigationService, NavigationStoreModule } from './store';
import { NavigationComponent } from './navigation.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, RouterModule, MaterialModule, NavigationStoreModule],
  providers: [NavigationService],
  exports: [NavigationComponent],
})
export class NavigationModule {}
