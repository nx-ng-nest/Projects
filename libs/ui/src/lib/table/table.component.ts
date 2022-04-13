import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import {
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';

import { fadeInOnEnterAnimation } from 'angular-animations';
import {
  BehaviorSubject,
  debounceTime,
  merge,
} from 'rxjs';
import { SubSink } from 'subsink';

import {
  IBaseCollectionService,
  ICommonFields,
} from '@projects/interface';

export interface TableAction {
  label: string;
  icon: string;
  event: any;
}

export interface TableOptions {
  tableActions: TableAction[];
  columns: string[];
  displayedColumns: string[];
  searchableColumns: string[];
}

export enum TableModuleTokens {
  TABLE_MODULE_DATA_SERVICE = 'TABLE_MODULE_DATA_SERVICE',
}

@Component({
  selector: 'projects-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOnEnterAnimation({ anchor: 'enter', duration: 1000 })],

})
export class TableComponent<T extends ICommonFields>
  implements AfterViewInit, OnDestroy, OnInit
{
  subsink = new SubSink();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<T>;
  @ViewChild(MatSelect) selectSearchKeyRef!: MatSelect;
  @Input() tableOptions!: TableOptions;

  @Output() actionClick = new EventEmitter();

  searchFieldControl = new FormControl('', []);
  dataSource = new MatTableDataSource<T>([]);

  selectItem$ = new BehaviorSubject<{
    event: MatCheckboxChange;
    item: any;
  } | null>(null);

  selectPage$ = new BehaviorSubject<number>(-1);
  selectSearchKeyInput$ = new BehaviorSubject<number>(-1);
  selectSearchKeyControl = new FormControl(['id']);

  constructor(
    @Inject(TableModuleTokens.TABLE_MODULE_DATA_SERVICE)
    public dataService: IBaseCollectionService<T>
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.subsink.sink = this.dataService?.filteredEntities$.subscribe((data) =>
      this.initHandler(data)
    );

    this.subsink.sink = merge(
      this.searchFieldControl.valueChanges,
      this.selectSearchKeyControl.valueChanges
    )
      .pipe(debounceTime(1000))
      .subscribe(() =>
        this.searchHandler(this.dataService, this.searchFieldControl)
      );

    this.selectSearchKeyInput$.pipe(debounceTime(3000)).subscribe((_) => {
      this.selectSearchKeyRef.close();
    });
  }

  initHandler(data: T[]) {
    this.dataSource.data = data;
    this.paginator._formFieldAppearance = 'outline';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  selectItem(event: MatCheckboxChange, item: any) {
    this.selectItem$.next({ event, item });
    this.selectItemHandler({ event, item });
  }
  selectItemHandler(options: { event: MatCheckboxChange; item: any } | null) {
    if (options)
      if (options.event.checked) {
        this.dataService.selectItem(options.item.id);
      } else {
        this.dataService.deselectItem(options.item.id);
      }
  }

  selectPage() {
    this.selectPage$.next(Math.random());
    this.selectPageHandler(this.dataSource, this.dataService, this.paginator);
  }

  private selectPageHandler(
    source: MatTableDataSource<T>,
    service: IBaseCollectionService<T>,
    paginator: MatPaginator
  ) {
    const { pageIndex, pageSize } = paginator;

    const start = pageIndex * pageSize;
    const end = pageIndex * pageSize + pageSize;
    const idsToBeSelected = source.data.slice(start, end).map((e) => e.id);

    service.selectAllItems(idsToBeSelected);
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

  sortSelectedItems() {
    this.sort.sort({ id: 'selected', start: 'asc', disableClear: true });
  }

  searchHandler(service: IBaseCollectionService<T>, control: FormControl) {
    const searchText: string = control.value.trim().toLowerCase();
    const searchKeys = (this.selectSearchKeyControl.value as (keyof T)[]) || [
      'id',
    ];

    console.log(searchText, searchKeys);

    if (searchText.length > 0) {
      this.dataService.setFilter((item: T) => {
        if (!searchKeys) {
          searchKeys;
        }
        return searchKeys
          .map((e: keyof T) => {
            const fieldValue = item[e] + '';
            const lowFieldValue = fieldValue.toLowerCase().trim();

            return lowFieldValue.includes(searchText);
          })
          ?.reduce((p: boolean, c: boolean) => p || c);
      });
    } else {
      service.removeFilter();
    }
  }

  handleSelectInput() {
    this.selectSearchKeyInput$.next(Math.random());
  }
}
