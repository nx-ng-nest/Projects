import {
  Component,
  OnInit,
} from '@angular/core';

import {
  Product,
  ProductService,
} from '@projects/client-service';

@Component({
  selector: 'projects-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent implements OnInit {
  constructor(public readonly productService: ProductService) {}
  displayedColumns = ['id', 'name', 'description', 'price', 'quantity'];

  rowActions = [
    {
      icon: 'preview',
      label: 'Preview',
    },
  ];

  ngOnInit(): void {
    this.productService.setFilter((p: Product) => {
      // Filter functions
      return p.name.includes('S');
    });
    this.productService.filter$.subscribe((data) => {
      console.log(data);
    });
  }

  rowClickHandler(product: any) {
    console.log(product);
  }
}
