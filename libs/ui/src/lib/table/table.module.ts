import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MaterialModule } from '../material';
import { StoreModule } from '@ngrx/store';
import { tableReducer, TableStoreEnum } from './store';

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature(TableStoreEnum.tableStoreName, tableReducer),
  ],
  exports: [TableComponent],
})
export class TableModule {}
