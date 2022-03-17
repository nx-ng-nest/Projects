export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly barcode: string,
    public readonly categories: string[],
    public readonly featuers: Record<string, any>,
    public readonly price: number,
    public readonly quantity: number,
    public readonly store: number
  ) {}
}
