import { ICommonFields, IID, OmitFields } from '../common';
import { IStore } from '../store';
import { IUser } from '../user';

export interface ISale<User = IUser, Store = IStore> extends ICommonFields {
  /**
   * Tax value as Percentage
   */
  tax: number;
  /**
   * Discount as Percentage
   */
  discount: number;

  /**
   * Total (including tax)
   */
  total: number;

  /**
   * Total (excluding tax)
   */
  subtotal: number;

  /**
   * User who made this sale.
   */
  user: User;

  /**
   * Store
   */
  store: Store;
}

export interface ISaleCreateDTO
  extends OmitFields<ISale<IID, IID>, ICommonFields> {}
