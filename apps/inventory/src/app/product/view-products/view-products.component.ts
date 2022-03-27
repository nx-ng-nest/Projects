import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IProduct } from '@projects/interface';
import { ProductService } from '../product.service';

@Component({
  selector: 'projects-products-table',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css'],
})
export class ViewProductsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IProduct>;

  selectedItems: IProduct[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'id', 'name'];

  dataSource!: MatTableDataSource<IProduct>;

  constructor(
    public productService: ProductService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit() {
    document.title = `View Products`;

    this.productService.getAll();

    this.productService.selectedItems$.subscribe(console.log);
  }

  ngAfterViewInit(): void {
    this.productService.filteredEntities$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  setFilter(filterValue: string) {
    this.productService.setFilter((p: IProduct) => {
      return JSON.stringify(p)
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    });
  }

  selectItem(event: MatCheckboxChange, product: IProduct) {
    if (event.checked) {
      this.productService.selectItem(product);
    } else {
      this.productService.deselectItem(product.id || -1);
    }
  }

  isSelected(id: number) {
    return (
      this.productService.selectedItems$
        .getValue()
        .findIndex((e) => e.id == id) >= 0
    );
  }

  viewItems() {
    for (const p of this.productService.selectedItems$.getValue()) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/product', p.id])
      );

      window.open(`#/${url}`, '_blank');
    }
  }

  deleteItems() {
    console.log(
      `Delete the selected items ${this.productService.selectedItems$.getValue()}`
    );
  }

  transferItems() {
    console.log(
      `Transfer items ${this.productService.selectedItems$.getValue()}`
    );
  }

  printBarcodes() {
    console.log(
      `Print barcodes ${this.productService.selectedItems$.getValue()}`
    );
  }

  selectAllItems(items: IProduct[]) {
    this.productService.selectAllItems(items);
  }

  deselectAllItems() {
    this.productService.deselectAllItems();
  }
}
