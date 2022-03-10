import { ProductDTO } from './product.dto';

export function productList(): ProductDTO[] {
  return [
    {
      barcode: '65678532454572345456',
      name: 'PS4 50GB Console',
      description: '50DB console',
      categories: [{ id: 1 }],
    },
    {
      barcode: '32452346457312',
      name: 'PS5 50GB Console',
      description: '50DB console',
      categories: [{ id: 2 }],
    },
    {
      barcode: '5234234123446457234',
      name: 'PS1 50GB Console',
      description: '50DB console',
      categories: [{ id: 3 }],
    },
  ];
}
