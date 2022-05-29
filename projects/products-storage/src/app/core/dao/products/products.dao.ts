import { Injectable } from '@angular/core';

import { EMPTY, Observable, of } from "rxjs";

export interface IProduct {
  id: string
  name: string;
  price: string;
  description: string;
  type: string;
  image: string;
}

export interface IProductsDao {
  getProductsList(): Observable<IProduct[]>

  addProduct(products: IProduct): Observable<IProduct[]>

  removeProduct(products: IProduct | undefined): Observable<IProduct[]>

  editProduct(product: IProduct): Observable<IProduct[]>
}

export interface IResponse<T> {
  message: string;
  details: T[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductsDao implements IProductsDao {
  private products: IProduct[] = [
    {
    id: '1',
    name: 'Kreatyna - monohydrat(750g)',
    price: '63,99',
    description: 'Kreatyna to naturalnie występująca w organizmie człowieka substancja. Monohydrat kreatyny, przez wzgląd na udokumentowane i wszechstronne działanie w zakresie wspierania wysiłku, jest jednym z najczęściej wybieranych suplementów dla sportowców, niezależnie od uprawianej dyscypliny.',
    type: 'Kreatyna',
    image: 'https://sklep.kfd.pl/10990-medium_default/xkfd-premium-creatine-500-g-kreatyna-monohydrat.jpg.pagespeed.ic.fJTEljaqwz.webp',
  },
    {
      id: '2',
      name: 'Kreatyna - monohydrat(1000g)',
      price: '70,99',
      description: 'Kreatyna to naturalnie występująca w organizmie człowieka substancja. Monohydrat kreatyny, przez wzgląd na udokumentowane i wszechstronne działanie w zakresie wspierania wysiłku, jest jednym z najczęściej wybieranych suplementów dla sportowców, niezależnie od uprawianej dyscypliny.',
      type: 'Kreatyna',
      image: 'https://sklep.kfd.pl/10990-medium_default/xkfd-premium-creatine-500-g-kreatyna-monohydrat.jpg.pagespeed.ic.fJTEljaqwz.webp',
    },
    {
      id: '3',
      name: 'Białko WPC - kokosowe(1000g)',
      price: '70,99',
      description: 'Prezentujemy Tobie - 3 kg opakowanie naszego białka, którego autorem jest wybitny artysta Marcin Van Cock. Produkt udowadnia, że wyczucie smaku i finezja może iść w parze z twardo stąpającym po ziemi pragmatyzmem. Jak zawsze możesz spodziewać się wysokiej jakości i formy, którą docenią wymagający koneserzy.',
      type: 'Bialko',
      image: 'https://sklep.kfd.pl/13345-medium_default/xkfd-regular-wpc-80-3000-g-bialko-serwatkowe-instant.jpg.pagespeed.ic.Ygx-V6zCPL.webp',
    },
    {
      id: '4',
      name: 'Białko WPC - ciasteczkowe(1000g)',
      price: '70,99',
      description: 'Prezentujemy Tobie - 3 kg opakowanie naszego białka, którego autorem jest wybitny artysta Marcin Van Cock. Produkt udowadnia, że wyczucie smaku i finezja może iść w parze z twardo stąpającym po ziemi pragmatyzmem. Jak zawsze możesz spodziewać się wysokiej jakości i formy, którą docenią wymagający koneserzy.',
      type: 'Bialko',
      image: 'https://sklep.kfd.pl/13345-medium_default/xkfd-regular-wpc-80-3000-g-bialko-serwatkowe-instant.jpg.pagespeed.ic.Ygx-V6zCPL.webp',
    }
  ]

  constructor() { }

  getProductsList(): Observable<IProduct[]> {
    return of(this.products)
  }

  addProduct(product: Partial<IProduct>): Observable<IProduct[]> {
    const mockProduct: IProduct = {
      ...product,
      id: Math.random().toString()
    } as IProduct

    const mockedResponse: IResponse<IProduct> = {
      message: 'Success DB updated',
      details: [...this.products, mockProduct]
    }

    return  of(mockedResponse.details)
  }

  removeProduct(product: IProduct | undefined): Observable<IProduct[]> {
    if (!product) {
      return EMPTY;
    }

    const mockedResponse: IResponse<IProduct> = {
      message: 'Success DB updated',
      details: this.products.filter((curentProduct: IProduct) => {
        if (curentProduct.id !== product.id) {
          return product;
        }
        return;
      })
    }

    return of(mockedResponse.details)
  }

  editProduct(product: IProduct): Observable<IProduct[]> {
    const editedProducts: IProduct[] =
      this.products.map((currentProduct: IProduct) => {
      return currentProduct.id === product.id ? product : currentProduct;
    })

    const mockedResponse: IResponse<IProduct> = {
      message: 'Success DB updated',
      details: editedProducts
    }

    return of(mockedResponse.details)
  }
}
