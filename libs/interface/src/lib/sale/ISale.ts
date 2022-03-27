import { IID } from '../common';

export interface Sale extends IID {
  tax: number;
  discount: number;
  total: number;
  subtotal: number;
  user: IID;
  store: IID;
}
