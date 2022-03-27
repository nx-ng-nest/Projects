import { IID } from '../common';

export interface IProduct extends IID {
  name: string;
  description: string;
  barcode: string;
  features: Record<string, unknown>;
  categories?: IID[];
}
