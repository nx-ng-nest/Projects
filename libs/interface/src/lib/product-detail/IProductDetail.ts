import { ICommonFields, IID, IIDS, ITimestamp, OmitFields } from '../common';
import { IProduct } from '../product/IProduct';
import { IStore } from '../store';

export interface IProductDetail<Store = IStore, Product = IProduct>
  extends ICommonFields {
  /**
   * Price
   */
  price: number;

  /**
   * Quantity
   */
  quantity: number;

  /**
   * Store
   */
  store: Store;

  /**
   * Product
   */
  product: Product;
}

export interface IProductDetailCreateDTO
  extends OmitFields<IProductDetail<IID, IID>, ITimestamp | IID | IIDS> {}
