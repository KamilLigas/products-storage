import { TestBed } from '@angular/core/testing';

import { ProductsDao } from './products.dao';

describe('ProductsDao', () => {
  let service: ProductsDao;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(ProductsDao);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
