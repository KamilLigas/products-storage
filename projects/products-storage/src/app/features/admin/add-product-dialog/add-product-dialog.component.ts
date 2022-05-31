import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import { IProduct } from "../../../core/dao/products/products.dao";

@Component({
  selector: 'my-org-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {
  newProductForm:  FormGroup;
  title: string = 'Add new product';
  types: string[] = ['Białko', 'Kreatyna', 'Inne']

  get checkAreTouched() {
    return (!this.newProductForm.controls['name'].value
      || !this.newProductForm.controls['type'].value
      || !this.newProductForm.controls['price'].value
      || !this.newProductForm.controls['description'].value);
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    private formBuilder: FormBuilder
  ) {
    this.newProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchFormGroupData();
  }

  fetchFormGroupData() {
    if (!this.data?.id) {
      return;
    }

    this.title = 'Edit template'
    this.newProductForm.patchValue(
      {
        name: this.data.name,
        type: this.data.type,
        price: this.data.price,
        description: this.data.description,
        image: this.data.image
      }
    )
  }
}
