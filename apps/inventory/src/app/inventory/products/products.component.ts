import { Component, OnInit } from '@angular/core';
import { ProductService } from '@projects/client-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'projects-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  tableName!: string;
  tableViewName!: string;
  constructor(public productService: ProductService) {}

  async ngOnInit() {
    this.tableName = 'Products';
    this.tableViewName = 'Default';
    await firstValueFrom(this.productService.getAll());
  }
}
