import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ProductService } from '@projects/client-service';
import { IProduct } from '@projects/interface';

@Component({
  selector: 'projects-products-table',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewProductsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IProduct>;

  searchKeyOptionControl = new FormControl('', []);
  searchKeyOptions = ['barcode', 'id', 'name', 'description'];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['selected', 'barcode', 'name', 'description'];

  dataSource!: MatTableDataSource<IProduct>;

  constructor(
    public productService: ProductService,
    // public appService: AppService,
    public dialog: MatDialog
  ) // public navService: NavigationService
  {}

  ngOnInit() {
    // this.appService.setPageName('View Products');
  }

  ngAfterViewInit(): void {
    this.productService.filteredEntities$.subscribe((data) => {
      this.paginator._formFieldAppearance = 'outline';

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  setFilter(filterValue: string) {
    const keyOptions = this.searchKeyOptionControl.value as (keyof IProduct)[];
    if (keyOptions) {
      //
    } else {
      this.productService.setFilter((p: IProduct) => {
        return JSON.stringify(p)
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });
    }
  }

  selectItem(event: MatCheckboxChange, product: IProduct) {
    this.productService.updateOneInCache({
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

  selectAllProducts(items: IProduct[]) {
    this.productService.selectAllItems();
  }

  async deselectAllProducts() {
    this.productService.deselectAllItems();
  }
}
