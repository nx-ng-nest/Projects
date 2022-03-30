import { Component, OnInit } from '@angular/core';
import { ProductService } from '@projects/client-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'projects-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(public productService: ProductService) {}

  async ngOnInit() {
    await firstValueFrom(this.productService.getAll());
  }
}
