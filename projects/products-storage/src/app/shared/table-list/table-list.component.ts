import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { SelectionModel } from "@angular/cdk/collections";
import { MatCheckboxChange } from "@angular/material/checkbox";

import { IProduct } from "../../core/dao/products/products.dao";

export type TableListColumn =
  | 'select'
  | 'name'
  | 'description'
  | 'price'
  | 'type'
  | 'actions'

export interface ISelectionChange<T> {
  added?: T[];
  removed?: T[];
}

@Component({
  selector: 'my-org-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableListComponent<T extends { id: string }> implements OnInit  {
  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>([]);
  expandedElement?: IProduct | null;
  selection: SelectionModel<string> = new SelectionModel<string>(false, []);

  @Input() displayedColumns: TableListColumn[] = [];
  @Output() selectionChanged: EventEmitter<ISelectionChange<T>> = new EventEmitter<ISelectionChange<T>>();


  constructor() { }

  ngOnInit(): void {
  }

  handleDataChange(
    data: T[],
  ): void {
    this.dataSource.data = data;
  }

  checkRow(event: MatCheckboxChange, row: T): void {
    this.selection.toggle(row.id);
    this.selectionChanged.emit(event.checked ? { added: [row] } : { removed: [row] });
  }
}
