import { BehaviorSubject } from 'rxjs';

import { EntityCollectionServiceBase } from '@ngrx/data';

export interface IBaseCollectionService<T>
  extends EntityCollectionServiceBase<T> {
  /**
   * Obserable selected items
   */
  selectedItems$: BehaviorSubject<T[]>;
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
  selectAllItems(ids?:(number | undefined)[]): void;
  /**
   * Set the items' selected property false
   */
  deselectAllItems(): void;

  /**
   * Find selected item by id
   * @param id T id
   */
  findSelectedItemsById(id: number): Promise<T | undefined>;

  /**
   * Remove filter
   */
  removeFilter(): void;
}
