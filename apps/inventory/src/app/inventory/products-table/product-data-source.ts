import {
  CollectionViewer,
  DataSource,
} from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

import {
  Product,
  ProductService,
} from '@projects/client-service';

@Injectable()
export class ProductDataSource extends DataSource<Product> {
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  subsink = new SubSink();

  constructor(private productService: ProductService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<readonly Product[]> {
    this.subsink.sink = this.productService.getAll().subscribe();
    return this.productService.entities$;
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.subsink.unsubscribe();
  }
}
