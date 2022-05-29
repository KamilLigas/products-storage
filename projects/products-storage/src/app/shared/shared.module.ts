import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatSortModule } from "@angular/material/sort";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";


import { TableListComponent } from './table-list/table-list.component';
import { TruncatePipe } from './pipes/truncate/truncate.pipe';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FilterInputComponent } from './filter-input/filter-input.component';




@NgModule({
  declarations: [
    TableListComponent,
    TruncatePipe,
    DeleteDialogComponent,
    FilterInputComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    TableListComponent,
    FilterInputComponent,
  ]
})
export class SharedModule { }
