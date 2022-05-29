import { Injectable } from '@angular/core';
import { IProduct } from "../../dao/products/products.dao";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  filterByName(products: IProduct[], searchValue: string): IProduct[] {
    return products?.filter((product: IProduct) => product.name.toLowerCase().includes(searchValue.toLowerCase())) ?? [];
  }
}
