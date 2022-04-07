import { ICategory } from '../category';
import { ICommonFields } from '../common';
import { IFeature } from '../feature';

export interface IProduct<Category = ICategory, Feature = IFeature>
  extends ICommonFields {
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
  features: Partial<Feature>[];

  /**
   * uuid
   */
  uuid: string;

  /**
   * Optional categories
   */
  categories: Partial<Category>[];
}
