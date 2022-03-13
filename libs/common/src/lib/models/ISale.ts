import { IProduct } from './IProduct';
import { IStore } from './IStore';

export interface ISale<TProduct = IProduct, TStore = IStore> {
  products: TProduct;
  store: TStore;
}
