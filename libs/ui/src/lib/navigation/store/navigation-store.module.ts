import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { NavigationEnum } from './navigation-store.enum';
import { navigationReducer } from './navigation.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(NavigationEnum.storeName, navigationReducer),
  ],
  exports: [StoreModule],
})
export class NavigationStoreModule {}
