import { AbstractControl } from '@angular/forms';

import {
  BehaviorSubject,
  first,
  firstValueFrom,
  map,
} from 'rxjs';

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import {
  IBaseCollectionService,
  ICommonFields,
} from '@projects/interface';

export class BaseCollectionService<T extends ICommonFields>
  extends EntityCollectionServiceBase<T>
  implements IBaseCollectionService<T>
{
  selectedItems$ = new BehaviorSubject<T[]>([]);

  constructor(
    entityName: string,
    elementsFactory: EntityCollectionServiceElementsFactory,
    protected subServices?: { [key: string]: BaseCollectionService<any> }
  ) {
    super(entityName, elementsFactory);
  }

  getFilteredEntities(): Promise<T[]> {
    return firstValueFrom(this.filteredEntities$);
  }

  async findSelectedItemsById(id: number): Promise<T | undefined> {
    const items = await this.getItems();
    return items.filter((e) => e.selected).find((e) => e.id == id);
  }

  selectItem(id: number) {
    this.updateOneInCache({ id, selected: true } as any);
  }

  deselectItem(id: number) {
    this.updateOneInCache({ id, selected: false } as any);
  }

  private async getItems() {
    return await firstValueFrom(this.filteredEntities$);
  }

  async selectAllItems(ids?: (number | undefined)[]) {
    if (ids) {
      this.updateManyInCache(
        ids.map((id) => ({ id, selected: true } as Partial<T>))
      );
    } else {
      const items = await this.getItems();
      this.updateManyInCache(
        (items as any).map((e: T) => ({ id: e.id, selected: true }))
      );
    }
  }

  async deselectAllItems(ids?: (number | undefined)[]) {
    if (ids) {
      this.updateManyInCache(
        ids.map((id) => ({ id, selected: false } as Partial<T>))
      );
    } else {
      const items = await this.getItems();
      this.updateManyInCache(
        (items as any).map((e: T) => ({ id: e.id, selected: false }))
      );
    }
  }

  removeFilter() {
    this.setFilter(null);
  }

  validateUnique(fieldName: keyof T, control: AbstractControl) {
    const asyncValidator = (c: AbstractControl) => {
      return this.entities$
        .pipe(
          map((data) => {
            const found = data.find(
              (item) =>
                (item[fieldName] as unknown as string).toLowerCase() ==
                control.value.toLowerCase()
            );

            if (found == undefined) {
              control.markAsPristine({ onlySelf: true });
              return null;
            } else {
              const msg = { unique: `${fieldName} must be unique!` };
              control.setErrors(msg);
              return msg;
            }
          })
        )
        .pipe(first());
    };

    return asyncValidator;
  }

  subService<S extends ICommonFields>(
    subServicePluralName: string
  ): BaseCollectionService<S> {
    if (this.subServices) {
      return this.subServices[subServicePluralName];
    }
    throw new Error('Sub service does not exist!');
  }
}
