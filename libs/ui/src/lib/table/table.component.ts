import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { IBaseCollectionService } from '@projects/interface';
import { Observable } from 'rxjs';
import {
  selectTableColumns,
  selectTableDisplayedColumns,
  TableActions,
} from './store';

export interface IData {
  id: number;
  selected: boolean;
}

@Component({
  selector: 'projects-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  @Input() tableName = 'first';
  @Input() tableViewName = 'first';

  searchKeyOptionControl = new FormControl('', []);
  searchKeyOptions = ['barcode', 'id', 'name', 'description'];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  columns$!: Observable<string[]>;
  displayedColumns$!: Observable<string[]>;
  tableActions$!: Observable<TableActions[]>;

  dataSource!: MatTableDataSource<IData>;

  @Input() dataService!: IBaseCollectionService<any>;

  constructor(
    private store: Store,

    public dialog: MatDialog
  ) {}

  ngOnInit() {
    if (!this.tableName) throw new Error('You must provide the table name!');

    this.columns$ = this.store.select(
      selectTableColumns(this.tableName, this.tableViewName)
    );

    this.displayedColumns$ = this.store.select(
      selectTableDisplayedColumns(this.tableName, this.tableViewName)
    );
  }

  ngAfterViewInit(): void {
    this.dataService?.filteredEntities$.subscribe((data: any) => {
      this.paginator._formFieldAppearance = 'outline';
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  setFilter(filterValue: string) {
    const keyOptions = this.searchKeyOptionControl.value as (keyof IData)[];
    if (keyOptions) {
      //
    } else {
      this.dataService.setFilter((p: IData) => {
        return JSON.stringify(p)
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });
    }
  }

  selectItem(event: MatCheckboxChange, product: IData) {
    this.dataService.updateOneInCache({
      id: product.id,
      selected: event.checked,
    });
  }

  selectAllItems() {
    this.dataService.selectAllItems();
  }

  deselectAllItems() {
    this.dataService.deselectAllItems();
  }
}
