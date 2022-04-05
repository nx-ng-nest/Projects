import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';

import { fadeInOnEnterAnimation } from 'angular-animations';
import { NGXLogger } from 'ngx-logger';
import { debounceTime } from 'rxjs';
import { SubSink } from 'subsink';

import { IBaseCollectionService } from '@projects/interface';

export interface TableAction {
  label: string;
  icon: string;
  event: any;
}

@Component({
  selector: 'projects-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOnEnterAnimation({ anchor: 'enter', duration: 1000 })],
})
export class TableComponent implements AfterViewInit, OnDestroy {
  subsink = new SubSink();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  @Input() searchKeys!: string[];
  @Input() columns!: string[];
  @Input() displayedColumns!: string[];
  @Input() tableActions!: TableAction[];
  @Output() actionClick = new EventEmitter();

  searchFieldControl = new FormControl('', []);
  dataSource = new MatTableDataSource([]);

  @Input() dataService!: IBaseCollectionService<any>;

  constructor(public dialog: MatDialog, private readonly logger: NGXLogger) {}

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
      .pipe(debounceTime(1000))
      .subscribe(() => {
        if (this.searchFieldControl.value.trim().length > 0) {
          this.dataService.setFilter((p: any) => {
            const searchValues = this.searchFieldControl.value
              .toLowerCase()
              .split(',')
              .map((v: string) => v.trim());
            const jvalue = JSON.stringify(p).toLowerCase();

            console.log(`Search Values: ${searchValues}`);
            return searchValues
              .map((sv: string) => jvalue.includes(sv))
              .reduce((p: boolean, c: boolean) => !!(p && c));
          });
        } else {
          this.dataService.removeFilter();
        }
      });
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
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
  handleAction(event: string) {
    this.actionClick.emit(event);
  }

  testRerender() {
    console.log('Rerendered Table Component!');
  }
}
