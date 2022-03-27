import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '@projects/interface';
import { ProductService } from '../product.service';

@Component({
  selector: 'projects-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  product!: IProduct;
  constructor(
    public productService: ProductService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      document.title = `View Product ${data['id']}`;
      console.log(data);
    });
  }
}
