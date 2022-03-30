import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { IBaseCollectionService } from '@projects/interface';
import { catchError, Observable, of } from 'rxjs';
import { SubSink } from 'subsink';
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
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  subsink = new SubSink();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  @Input() tableName = 'first';
  @Input() tableViewName = 'first';

  searchKeyOptionControl = new FormControl('', []);
  searchKeyOptions = ['barcode', 'id', 'name', 'description'];

  columns$ = this.store
    .select(selectTableColumns(this.tableName, this.tableViewName))
    .pipe(
      catchError((err, caught) => {
        return of([]);
      })
    );

  displayedColumns$ = this.store
    .select(selectTableDisplayedColumns(this.tableName, this.tableViewName))
    .pipe(
      catchError((err, caught) => {
        return of([]);
      })
    );

  tableActions$!: Observable<TableActions[]>;

  dataSource = new MatTableDataSource([]);

  @Input() dataService!: IBaseCollectionService<any>;

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit() {
    if (!this.tableName) throw new Error('You must provide the table name!');
  }

  ngAfterViewInit() {
    this.subsink.sink = this.dataService?.filteredEntities$.subscribe(
      (data: any) => {
        this.dataSource.data = data;
        this.paginator._formFieldAppearance = 'outline';
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
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
