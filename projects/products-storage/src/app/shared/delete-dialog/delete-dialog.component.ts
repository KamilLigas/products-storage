import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IDeleteDialogData {
  message: string;
  title?: string;
}

@Component({
  selector: 'my-org-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  deleteForced: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDeleteDialogData) {

  }

  ngOnInit(): void {
  }

}
