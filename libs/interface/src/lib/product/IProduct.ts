import { ICategory } from '../category';
import {
  ICommonFields,
  IID,
  IIDS,
  IStatus,
  ITimestamp,
  OmitFields,
} from '../common';

export interface IProduct<Category = ICategory> extends ICommonFields {
  /**
   * Unique required name
   */
  name: string;
  /**
   * Optional description
   */
  description: string;

  /**
   * Required barcode
   */
  barcode: string;

  /**
   * Optional features object
   */
  features: Record<string, unknown>;

  /**
   * Optional categories
   */
  categories: Category[];
}

export interface IProductCreateDTO
  extends OmitFields<IProduct<IID>, ITimestamp & IID> {}
