import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmationDialogComponent implements OnInit {
  formGroup: FormGroup;
  data
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: any, private formBuilder: FormBuilder) {
    this.data = dialogData.reqdata;
    this.formGroup = this.formBuilder.group({
      tierName: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onConfirm() {
    this.dialogRef.close({ action: this.data.action });
  }

  onSave() {
    if (this.formGroup.valid) {
      this.dialogRef.close({ action: this.data.action, formValue: this.formGroup.value });
    }
  }

}
