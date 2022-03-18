import {
  Component,
  OnInit,
} from '@angular/core';

import { ProductService } from '@projects/client-service';

@Component({
  selector: 'inventory-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit() {}
}
