import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { TableItem } from './table-datasource';

export type RowAction = {
  icon: string;
  label: string;
};

export type RowActions = RowAction[];

@Component({
  selector: 'projects-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements AfterViewInit, OnInit {
  selectedItems = new Set<number>();
  @Output() clickAction = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;

  @Input() dataSource!: any;
  @Input() displayedColumns!: string[];

  @Input() rowActions!: {
    icon: string;
    label: string;
  }[];

  allColumns!: string[];

  ngOnInit(): void {
    this.allColumns = ['check', ...this.displayedColumns];
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  selectItem(event: any, row: any) {
    if (event.checked) {
      this.selectedItems.add(row.id);
      return;
    }
    this.selectedItems.delete(row.id);
  }

  clickActionHandler(action: RowAction) {
    const result = {
      action: { ...action },
      ids: [...this.selectedItems],
    };
    console.log(result);
    this.clickAction.emit(result);
  }
}
