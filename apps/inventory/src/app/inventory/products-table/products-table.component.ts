import {
  Component,
  OnInit,
} from '@angular/core';

import { ProductService } from '@projects/client-service';

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

  ngOnInit(): void {}

  rowClickHandler(product: any) {
    console.log(product);
  }
}
