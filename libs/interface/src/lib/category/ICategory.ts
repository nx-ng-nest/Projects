import { ICommonFields, IID, IStatus, ITimestamp, OmitFields } from '../common';

export interface ICategory extends ICommonFields {
  /**
   * Required category name
   */
  name: string;
}

export interface ICreateCategoryDTO
  extends OmitFields<ICategory, ICommonFields> {}
