import {
  Component,
  OnInit,
} from '@angular/core';

import { firstValueFrom } from 'rxjs';

import {
  CategoryService,
  ProductService,
} from '@projects/client-service';

import { LocalStoreService } from './common/localstore.service';

@Component({
  selector: 'projects-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public productService: ProductService,
    public categoryService: CategoryService
  ) {}
  async ngOnInit() {
    LocalStoreService.products(
      await firstValueFrom(this.productService.getAll())
    );
    LocalStoreService.categories(
      await firstValueFrom(this.categoryService.getAll())
    );
  }
}
