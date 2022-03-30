import { ICommonFields, OmitFields } from '../common';

export interface IStore extends ICommonFields {
  /**
   * Unique store name
   */
  name: string;
}

export interface IStoreCreateDTO extends OmitFields<IStore, ICommonFields> {}
