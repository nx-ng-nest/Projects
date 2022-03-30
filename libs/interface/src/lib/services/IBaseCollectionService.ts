import { EntityCollectionServiceBase } from '@ngrx/data';
import { ICategory } from '../category';
import { ICommonFields } from '../common';
import { IProduct } from '../product';
import { IProductDetail } from '../product-detail';
import { ISale } from '../sale';
import { IStore } from '../store';
import { IUser } from '../user';

export interface IBaseCollectionService<
  T extends ICommonFields = IUser | IProduct | ICategory | IProductDetail | IStore | ISale
> extends EntityCollectionServiceBase<T> {
  /**
   * Set the selected property item true.
   * @param id T id
   */
  selectItem(id: number): void;
  /**
   * Set the selected property item false.
   * @param id T id
   */
  deselectItem(id: number): void;

  /**
   * Get the filtered entities
   */
  getFilteredEntities(): Promise<T[]>;

  /**
   * Set the selected property of filtered items true
   */
  selectAllItems(): void;
  /**
   * Set the items' selected property false
   */
  deselectAllItems(): void;

  /**
   * Find selected item by id
   * @param id T id
   */
  findSelecteseledItemById(id: number): Promise<T>;
}
