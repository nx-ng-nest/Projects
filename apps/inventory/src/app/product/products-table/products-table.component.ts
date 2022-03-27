import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { IProduct } from '@projects/interface';
import { ProductService } from '../product.service';
import { ProductsTableItem } from './products-table-datasource';

@Component({
  selector: 'projects-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
})
export class ProductsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProductsTableItem>;

  selectedItems: IProduct[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'id', 'name'];

  dataSource!: MatTableDataSource<IProduct>;

  constructor(public productService: ProductService) {}

  ngOnInit() {
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

  selectItem(event: MatCheckboxChange, productId: number) {
    if (event.checked) {
      this.productService.selectItem(productId);
    } else {
      this.productService.deselectItem(productId);
    }
  }

  isSelected(id: number) {
    return this.productService.selectedItems$.getValue().includes(id);
  }

  viewItems() {
    console.log(
      `View the selected items ${this.productService.selectedItems$.getValue()}`
    );
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
    this.productService.selectAllItems(items.map((e) => e.id || 0));
  }

  deselectAllItems() {
    this.productService.deselectAllItems();
  }
}
