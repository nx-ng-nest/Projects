import { ICommonFields } from '../common';

export interface ICategory extends ICommonFields {
  /**
   * Required category name
   */
  name: string;
}
