import { NgModule } from '@angular/core';

import { EntityDefinitionService } from '@ngrx/data';

import { productEntityConfig } from './product-entity-metadata';
import { ProductService } from './product.service';

@NgModule({
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductEntityModule {
  constructor(eds: EntityDefinitionService) {
    eds.registerMetadataMap(productEntityConfig.entityMetadata);
  }
}
