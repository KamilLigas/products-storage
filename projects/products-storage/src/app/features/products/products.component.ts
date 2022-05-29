import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IProduct, ProductsDao} from "../../core/dao/products/products.dao";
import {Subject, takeUntil} from "rxjs";
import {TableListColumn, TableListComponent} from "../../shared/table-list/table-list.component";
import {FilterService} from "../../core/services/filter-service/filter.service";

@Component({
  selector: 'my-org-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayColumns: TableListColumn[] = [
    'name',
    'description',
    'price',
    'type'
  ]

  products?: IProduct[];
  filteredProducts?: IProduct[];

  private componentDestroyed$: Subject<void> = new Subject<void>();
  @ViewChild(TableListComponent) tableListComponent?: TableListComponent<IProduct>

  constructor(
    private productsDao: ProductsDao,
    private cdr: ChangeDetectorRef,
    private filterService: FilterService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.fetchProducts();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  filterValue(value: string) {
    if (!this.products) {
      return;
    }

    this.filteredProducts = this.filterService.filterByName(this.products, value)
    this.tableListComponent?.handleDataChange(this.filteredProducts)
  }

  clearFilteredProducts() {
    this.tableListComponent?.handleDataChange(this.products ?? []);
  }

  private fetchProducts(): void {
    this.productsDao.getProductsList()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((products: IProduct[]) => {
        this.products = products;
        this.tableListComponent?.handleDataChange(products)
      })
  }
}
