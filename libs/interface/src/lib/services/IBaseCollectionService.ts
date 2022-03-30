import { EntityCollectionServiceBase } from '@ngrx/data';

export interface IBaseCollectionService<T>
  extends EntityCollectionServiceBase<T> {
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
  findSelecteseledItemById(id: number): Promise<T | undefined>;
}
