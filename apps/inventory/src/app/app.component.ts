import {
  Component,
  OnInit,
} from '@angular/core';

import { firstValueFrom as fv } from 'rxjs';

import {
  CategoryService,
  FeatureService,
  MessageService,
  ProductDetailService,
  ProductService,
  SaleService,
  StoreService,
  TaskService,
} from '@projects/client-service';

import { LocalStoreService as ls } from './common/localstore.service';

@Component({
  selector: 'projects-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public productService: ProductService,
    public categoryService: CategoryService,
    public featureService: FeatureService,
    public saleService: SaleService,
    public storeService: StoreService,
    public messageService: MessageService,
    public taskService: TaskService,
    public productDetailService: ProductDetailService
  ) {}
  async ngOnInit() {
    ls.products(await fv(this.productService.getAll()));
    ls.categories(await fv(this.categoryService.getAll()));

    ls.features(await fv(this.featureService.getAll()));
    ls.sales(await fv(this.saleService.getAll()));
    ls.stores(await fv(this.storeService.getAll()));
    ls.messages(await fv(this.messageService.getAll()));
    ls.tasks(await fv(this.taskService.getAll()));
    ls.productDetails(await fv(this.productDetailService.getAll()));
  }
}
