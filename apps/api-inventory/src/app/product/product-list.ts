import { ProductDTO } from './product.dto';

export function productList(): ProductDTO[] {
  return [
    {
      barcode: '123123123123',
      name: 'PS3 50GB Console',
      description: '50DB console',
      categories: [{ id: 1 }],
    },
  ];
}
