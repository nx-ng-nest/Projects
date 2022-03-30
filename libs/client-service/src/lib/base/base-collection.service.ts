import { firstValueFrom } from 'rxjs';

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { ICommonFields } from '@projects/interface';

export class BaseCollectionService<
  T extends ICommonFields
> extends EntityCollectionServiceBase<T> {
  constructor(
    entityName: string,
    elementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(entityName, elementsFactory);
  }

  selectItem(id: number) {
    this.updateOneInCache({ id, selcted: true } as any);
  }

  deselectItem(id: number) {
    this.updateOneInCache({ id, selected: false } as any);
  }

  private async getItems() {
    return await firstValueFrom(this.filteredEntities$);
  }

  async selectAllItems() {
    const items = await this.getItems();

    this.updateManyInCache(
      (items as any).map((e: T) => ({ id: e.id, selected: true }))
    );
  }

  async deselectAllItems() {
    const items = await this.getItems();
    this.updateManyInCache(
      (items as any).map((e: T) => ({ id: e.id, selected: false }))
    );
  }

  async findSelecteseledItemById(id: number) {
    const items = await this.getItems();
    return items.filter((e) => e.selected).find((e) => e.id == id);
  }
}
