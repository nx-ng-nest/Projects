import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@projects/client-service';
import { map } from 'rxjs';
import { AppService } from '../../app.service';

@Component({
  selector: 'projects-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  products$ = this.productService.filteredEntities$.pipe(
    map((items) => items.filter((e) => e.selected))
  );
  constructor(
    public productService: ProductService,
    public activatedRoute: ActivatedRoute,
    public appService: AppService
  ) {}

  ngOnInit(): void {
    this.appService.setPageName('Edit Products');
  }

  close(id: any) {
    this.productService.updateOneInCache({ id, selected: false });
  }
}
