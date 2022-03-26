import { CollectionViewer } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class ProductService extends EntityCollectionServiceBase<Product> {
  searchControl = new FormControl('');
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  subsink = new SubSink();
  constructor(elementsFactory: EntityCollectionServiceElementsFactory) {
    super('Product', elementsFactory);
  }

  connect(collectionViewer: CollectionViewer): Observable<readonly Product[]> {
    this.subsink.sink = this.getAll().subscribe();
    this.subsink.sink = this.searchControl.valueChanges.subscribe(
      (filterText) => {
        if (filterText && filterText.trim().length > 0) {
          this.setFilter((p: Product) => {
            const textString = JSON.stringify(p).toLowerCase();
            const filterTexts = filterText
              ?.toLowerCase()
              .split(' ') as string[];
            return filterTexts
              .map((t) => textString.includes(t))
              .reduce((p, c) => p && c);
          });
        } else {
          this.setFilter((p: any) => p);
        }
      }
    );
    return this.filteredEntities$;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subsink.unsubscribe();
  }
}
