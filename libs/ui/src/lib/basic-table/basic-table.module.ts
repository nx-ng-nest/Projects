import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { BasicTableComponent } from './basic-table.component';

@NgModule({
  declarations: [BasicTableComponent],
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  exports: [BasicTableComponent],
})
export class BasicTableModule {}
