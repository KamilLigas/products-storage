import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { FormControl } from "@angular/forms";

import {debounceTime, EMPTY, mergeMap, Subject, takeUntil} from "rxjs";

import { ISelectionChange, TableListColumn, TableListComponent } from "../../shared/table-list/table-list.component";
import { IProduct, ProductsDao } from "../../core/dao/products/products.dao";
import { DeleteDialogComponent, IDeleteDialogData } from "../../shared/delete-dialog/delete-dialog.component";
import { AddProductDialogComponent } from "./add-product-dialog/add-product-dialog.component";
import {FilterService} from "../../core/services/filter-service/filter.service";

@Component({
  selector: 'my-org-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit, OnDestroy {
  displayColumns: TableListColumn[] = [
    'name',
    'description',
    'type',
    'price',
    'select'
  ]
  products?: IProduct[];
  selectedProduct?: IProduct;
  filteredProducts?: IProduct[];
  private componentDestroyed$: Subject<void> = new Subject<void>();

  @ViewChild(TableListComponent) tableListComponent?: TableListComponent<IProduct>

  constructor(
    private productsDao: ProductsDao,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
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

  addData() {
    this.dialog.open(AddProductDialogComponent)
      .afterClosed()
      .pipe(
        mergeMap((formGroup: any) => {
          if (!formGroup) {
            return EMPTY
          }
          const product: Partial<IProduct> = formGroup

          return this.productsDao.addProduct(product)
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((products: IProduct[]) => {
        this.fetchData(products);
      })
  }

  removeData(): void {
    const data: IDeleteDialogData = {
      message: `Do you want to delete product ${this.selectedProduct?.name}?`,
      title: `Delete`
    }
    this.dialog.open<DeleteDialogComponent, IDeleteDialogData>(DeleteDialogComponent, {
      data
    })
      .afterClosed()
      .pipe(
        mergeMap((confirmation: boolean) => {
          if (confirmation) {
            return this.productsDao.removeProduct(this.selectedProduct)
          }
          return EMPTY
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((products: IProduct[]) => {
        this.fetchData(products);
      })

  }

  editData(): void {
    if (!this.products) {
      return;
    }

    const data = this.selectedProduct

    this.dialog
      .open<AddProductDialogComponent, IProduct>(AddProductDialogComponent, { data })
      .afterClosed()
      .pipe(
        mergeMap((formGroup: any) => {
          if (!formGroup) {
            return EMPTY
          }
          return this.productsDao.editProduct({...formGroup, id: this.selectedProduct?.id})
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((products: IProduct[]) => {
        this.fetchData(products);
      })
  }

  selectProduct(event: ISelectionChange<IProduct>) {
    if (!event.added?.length) {
      this.selectedProduct = {} as IProduct;
      return;
    }

    this.selectedProduct = event.added[0];
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

  private fetchData(products: IProduct[]): void {
    if (!products.length) {
      return;
    }

    this.products = products;
    this.tableListComponent?.handleDataChange(products);
  }

  private fetchProducts(): void {
    this.productsDao.getProductsList()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((products: IProduct[]) => {
        this.fetchData(products);
      })
  }
}
