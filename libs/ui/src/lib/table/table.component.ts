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
import { SubSink } from 'subsink';
import { TableAction } from './store';
import { slideInRightOnEnterAnimation } from 'angular-animations';
import { mergeWith } from 'rxjs';

@Component({
  selector: 'projects-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    slideInRightOnEnterAnimation({ anchor: 'enter', duration: 1000 }),
  ],
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  subsink = new SubSink();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  @Input() searchKeys!: string[];
  @Input() columns!: string[];
  @Input() displayedColumns!: string[];
  @Input() tableActions!: TableAction[];
  selectFieldControl = new FormControl('name', []);
  searchFieldControl = new FormControl('', []);
  dataSource = new MatTableDataSource([]);

  @Input() dataService!: IBaseCollectionService<any>;

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.subsink.sink = this.dataService?.filteredEntities$.subscribe(
      (data: any) => {
        this.dataSource.data = data;
        this.paginator._formFieldAppearance = 'outline';
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );

    this.subsink.sink = this.searchFieldControl.valueChanges
      .pipe(mergeWith(this.selectFieldControl.valueChanges))
      .subscribe((value) => {
        this.dataService.setFilter((p: any) => {
          const selectField = this.selectFieldControl.value;
          const searchValue = this.searchFieldControl.value;

          if (selectField && searchValue) {
            return p[selectField]
              ? p[selectField].toLowerCase().includes(searchValue.toLowerCase())
              : true;
          }
          return true;
        });
      });
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  setFilter(filterValue: string) {
    if (this.selectFieldControl.value) {
      this.dataService.setFilter((p: any) =>
        p[this.selectFieldControl.value]
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }
  }

  selectItem(event: MatCheckboxChange, product: any) {
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
