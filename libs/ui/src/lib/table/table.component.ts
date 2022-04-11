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
import { MatSort } from '@angular/material/sort';
import {
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';

import { fadeInOnEnterAnimation } from 'angular-animations';
import {
  BehaviorSubject,
  debounceTime,
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

  @Input() tableOptions!: TableOptions;

  @Output() actionClick = new EventEmitter();

  searchFieldControl = new FormControl('', []);
  dataSource = new MatTableDataSource<T>([]);

  selectItem$ = new BehaviorSubject<{
    event: MatCheckboxChange;
    item: any;
  } | null>(null);

  selectPage$ = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(TableModuleTokens.TABLE_MODULE_DATA_SERVICE)
    public dataService: IBaseCollectionService<T>
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.subsink.sink = this.dataService?.filteredEntities$.subscribe((data) =>
      this.initHandler(data)
    );

    this.subsink.sink = this.searchFieldControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(() =>
        this.searchHandler(this.dataService, this.searchFieldControl)
      );

    this.subsink.sink = this.selectItem$.subscribe((e) => {
      this.selectItemHandler(e);
    });

    this.subsink.sink = this.selectPage$.subscribe((e) => {
      this.selectPageHandler(this.dataSource, this.dataService, this.paginator);
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
    this.selectPage$.next(true);
  }

  private selectPageHandler(
    source: MatTableDataSource<T>,
    service: IBaseCollectionService<T>,
    paginator: MatPaginator
  ) {
    const { pageIndex, pageSize } = paginator;

    const start = pageIndex * pageSize;
    const end = pageIndex * pageSize + pageSize;
    const idsToBeSelected = source.data
      .slice(start, end)
      .map((e) => e.id);

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
    const advanceSearchText = searchText.split(',').map((e) => e.trim());

    if (searchText.length > 0) {
      service.setFilter((item: T) => {
        const jvalue = JSON.stringify(item).toLowerCase();

        return advanceSearchText
          .map((sv: string) => jvalue.includes(sv))
          .reduce((p: boolean, c: boolean) => !!(p && c));
      });
    } else {
      service.removeFilter();
    }
  }
}
