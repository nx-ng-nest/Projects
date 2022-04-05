import { ICategory } from '../category';
import { ICommonFields } from '../common';

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
   * Optional features object
   */
  features: Array<Record<string, string>>;

  /**
   * uuid
   */
  uuid: string;

  /**
   * Optional categories
   */
  categories: Partial<Category>[];
}
