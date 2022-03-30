import { ICommonFields, IID, OmitFields } from '../common';
import { IStore } from '../store';
import { IUser } from '../user';

export interface IClockIn<User = IUser, Store = IStore> extends ICommonFields {
  /**
   * Start date
   */
  start: Date;

  /**
   * Stop date
   */
  stop: Date;

  /**
   * Owner
   */
  user: User;

  /**
   * Store
   */
  store: Store;
}

export interface IClockInCreateDTO
  extends OmitFields<IClockIn<IID, IID>, ICommonFields> {}
