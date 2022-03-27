import { IID } from '../common';

export interface IProductDetail extends IID {
  price: number;
  quantity: number;
  store: IID;
  product: IID;
}
