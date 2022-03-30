import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { IBaseCollectionService, ICommonFields, IProduct, IUser } from '@projects/interface';

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

  searchKeyOptionControl = new FormControl('', []);
  searchKeyOptions = ['barcode', 'id', 'name', 'description'];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['selected', 'barcode', 'name', 'description'];

  dataSource!: MatTableDataSource<IData>;

  @Input() dataService!: IBaseCollectionService;

  constructor(
    // public appService: AppService,
    public dialog: MatDialog // public navService: NavigationService
  ) {}

  ngOnInit() {}

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
      ...product,
      selected: event.checked,
    });
  }

  editProducts() {
    // this.navService.editProducts();
  }

  deleteProducts() {
    throw new Error('Not Implemented');
  }

  transferProducts() {
    throw new Error('Not Implemented');
  }

  printBarcodes() {
    throw new Error('Not Implemented');
  }

  selectAllProducts(items: IData[]) {
    this.dataService.selectAllItems();
  }

  async deselectAllProducts() {
    this.dataService.deselectAllItems();
  }
}
