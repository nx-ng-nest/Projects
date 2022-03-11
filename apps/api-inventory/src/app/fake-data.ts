import {
  Category,
  Product,
  Store,
} from '@projects/models';

export const FakeData = {


  products:[
    {name:'product name 1', description:'product description 1', barcode:'product barcode 1'},
    {name:'product name 2', description:'product description 2', barcode:'product barcode 2'},
    {name:'product name 3', description:'product description 3', barcode:'product barcode 3'},
    {name:'product name 4', description:'product description 4', barcode:'product barcode 4'},
    {name:'product name 5', description:'product description 5', barcode:'product barcode 5'},
    {name:'product name 6', description:'product description 6', barcode:'product barcode 6'},
    {name:'product name 7', description:'product description 7', barcode:'product barcode 7'},
  ] as Product[],

  categories:[
    {name:'category 1', },
    {name:'category 2', },
    {name:'category 3', },
    {name:'category 4', },
    {name:'category 5', },
    {name:'category 6', },
    {name:'category 7', },
  ] as Category[],

  stores:[
    {name:'store 1', },
    {name:'store 2', },
    {name:'store 3', },
    {name:'store 4', },
    {name:'store 5', },
    {name:'store 6', },
    {name:'store 7', },
  ] as Store[],


  prices:[
    {price:1, store:{id:1}, product:{id:1}}
  ]

}
