import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, Subject, takeUntil} from "rxjs";
import {IProduct} from "../../core/dao/products/products.dao";

@Component({
  selector: 'my-org-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss']
})
export class FilterInputComponent implements OnInit, OnDestroy {
  formControl: FormControl = new FormControl('');
  private componentDestroyed$: Subject<void> = new Subject<void>();

  @Output() filtersValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() clearFilers: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    this.listenOnFilterInput()
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  listenOnFilterInput(): void {
    this.formControl.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((value: string) => {
        if (!value) {
          return;
        }

        this.filtersValue.emit(value)
      })
  }

  removeFilters() {
    this.formControl.reset();
    this.clearFilers.emit();
  }

}
