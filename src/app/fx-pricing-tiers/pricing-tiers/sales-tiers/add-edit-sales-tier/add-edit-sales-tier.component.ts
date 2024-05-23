import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SalesTiersService } from '../sales-tiers.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ApiService } from 'app/services/api.service';
import { Globals } from 'globals.service';

@Component({
  selector: 'app-add-edit-sales-tier',
  templateUrl: './add-edit-sales-tier.component.html',
  styleUrls: ['./add-edit-sales-tier.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditSalesTierComponent implements OnInit {

  salesTierId;
  ccyGroupId;
  isDefaultSalesTier = false;
  isTierNameReadOnly = true;
  isFirstPage = true;

  tenorsList: any;
  defaultPricesList = ['Flat 1%', 'Flat 2%', 'Flat 3%']
  applicableChannelsList = []
  availableCCYPairs: any = [];
  selectedCCYPairs: any = [];

  configSalesTierForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AddEditSalesTierComponent>,
    private _formBuilder: FormBuilder, private salesService: SalesTiersService, private apiService: ApiService,
    private globalService: Globals) {
    if (data && data.isDefaultSalesTier) {
      this.isDefaultSalesTier = true;
      if (data.salesTierId && data.ccyGroupId) {
        this.salesTierId = data.salesTierId;
        this.ccyGroupId = data.ccyGroupId;
      }
      else {
        this.isTierNameReadOnly = false;
      }
    }
    else if (data && !data.isDefaultSalesTier && data.salesTierId) {
      this.isDefaultSalesTier = false;
      this.salesTierId = data.salesTierId;
      if (data.ccyGroupId) {
        this.ccyGroupId = data.ccyGroupId;
      }
    }
  }

  ngOnInit() {
    this.getApplicableChannels();
    this.getCCYPair();
    this.getTenor();
    this.initializeForm();
  }

  getSalesTierById(tierId: any) {
    this.salesService.getSalesTierById(tierId).subscribe(
      (data) => {
        return data;
      }
    );
  }

  getCCYPair() {
    this.apiService.get(ApiService.StaticData_URL + "currency-pairs").subscribe(
      (data) => {
        if (data && Array.isArray(data)) {
          const uniqueCCYPairs = data
            .map(item => item.ccyPair)
            .filter(ccyPair => !this.selectedCCYPairs.includes(ccyPair));
          this.availableCCYPairs = uniqueCCYPairs;
        }
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
  }

  getTenor() {
    this.apiService.get(ApiService.STATIC_DATA_PROP_CONFIG + "IndexTenors").subscribe(
      (data: any) => {
        if (data) {
          this.tenorsList = (data.value).split(',');
        }
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
  }

  getApplicableChannels() {
    this.apiService.get(ApiService.STATIC_DATA_PROP_CONFIG + "Channel").subscribe(
      (data: any) => {
        this.applicableChannelsList = (data.value).split(',');
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
  }

  initializeForm() {
    const formGroupConfig: any = {
      tierName: ['', Validators.required],
      tenorRange: this._formBuilder.array([
        this.initTenorRange()
      ]),
      defaultPrice: ['', Validators.required],
      availableCCYPairsSearch: [''],
      selectedCCYPairsSearch: ['']
    };

    if (!this.isDefaultSalesTier) {
      formGroupConfig.applicableChannel = [[], Validators.required];
    }

    this.configSalesTierForm = this._formBuilder.group(formGroupConfig);

    if (this.salesTierId) {
      this.salesService.getSalesTierById(this.salesTierId).subscribe(
        (data) => {
          if (data) {
            this.configSalesTierForm.patchValue({
              tierName: data.tierName,
            });

            if (this.ccyGroupId) {
              this.configSalesTierForm.get('defaultPrice').setValue(this.salesService.getDefaultPriceNameById(data.defaultPrice));

              if (!this.isDefaultSalesTier) {
                this.configSalesTierForm.get('applicableChannel').setValue(data.channels);
              }

              const tenorRangeArray = this.getTenorRangeFormArray;
              while (tenorRangeArray.length) {
                tenorRangeArray.removeAt(0);
              }

              if (data.ccyGroups && data.ccyGroups.length > 0) {
                let ccyGroup = data.ccyGroups.find(ccyGrp => ccyGrp.id === this.ccyGroupId);
                ccyGroup.tenors.forEach((tenorRange: any) => {
                  tenorRangeArray.push(this.initTenorRange(tenorRange));
                });

                if (ccyGroup.pricingCcySet && ccyGroup.pricingCcySet.length > 0) {
                  ccyGroup.pricingCcySet.forEach((ccyPair: any) => {
                    this.selectedCCYPairs.push(ccyPair.ccyPair);
                  })
                }
              }
            }
          }
        }
      );
    }
  }

  initTenorRange(tenorRange?: any) {
    return this._formBuilder.group({
      from: [tenorRange ? tenorRange.rangeFrom : '', Validators.required],
      to: [tenorRange ? tenorRange.rangeTo : '', Validators.required],
      price: [(tenorRange && tenorRange.pricingAmount && tenorRange.pricingAmount.tierName) ? tenorRange.pricingAmount.tierName : '']
    });
  }

  get getTenorRangeFormArray(): FormArray {
    return this.configSalesTierForm.get('tenorRange') as FormArray;
  }

  addTier() {
    const control = this.getTenorRangeFormArray;
    const lastIndex = control.length - 1;

    if (lastIndex >= 0) {
      const lastTier = control.at(lastIndex);
      const from = lastTier.get('from').value;
      const to = lastTier.get('to').value;

      if (!from || !to) {
        lastTier.get('from').markAsTouched();
        lastTier.get('to').markAsTouched();
        return;
      }
    }

    control.push(this.initTenorRange());
  }

  deleteTier(index: number) {
    const control = this.getTenorRangeFormArray;
    control.removeAt(index);
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  onNextButtonClick() {
    const formValues = this.configSalesTierForm.value;
    console.log('Form Values:', formValues);

    if (this.configSalesTierForm.valid) {
      this.isFirstPage = !this.isFirstPage;
      this.setDefualtPrice();
    } else {
      this.markFormGroupAsTouched(this.configSalesTierForm);
    }
  }

  setDefualtPrice() {
    const formArray = this.getTenorRangeFormArray;
    formArray.controls.forEach(control => {
      if (control.get('price').value === '') {
        control.get('price').setValue(this.configSalesTierForm.get('defaultPrice').value);
      }
    });
  }

  onSaveButtonClick() {
    if (this.configSalesTierForm.valid) {
      if (!this.isDefaultSalesTier && this.selectedCCYPairs.length == 0) {
        this.markFormGroupAsTouched(this.configSalesTierForm);
        return;
      }
      const formValues = this.configSalesTierForm.value;
      console.log('Form Values:', formValues);
      console.log(this.selectedCCYPairs);
      this.dialogRef.close({ result: true });
    } else {
      this.markFormGroupAsTouched(this.configSalesTierForm);
    }
  }

  markFormGroupAsTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupAsTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  onPreviousButtonClick() {
    this.isFirstPage = !this.isFirstPage;
  }

  get filteredAvailableCCYPairs(): string[] {
    return this.availableCCYPairs.filter(item => item.toLowerCase().includes(this.configSalesTierForm.get('availableCCYPairsSearch').value.toLowerCase()));
  }

  get filteredSelectedCCYPairs(): string[] {
    return this.selectedCCYPairs.filter(item => item.toLowerCase().includes(this.configSalesTierForm.get('selectedCCYPairsSearch').value.toLowerCase()));
  }

  drop(event: CdkDragDrop<string[]>, filteredArray: string[]) {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, previousIndex, currentIndex);
    } else {
      const draggedItem = filteredArray[previousIndex];

      const filteredPreviousIndex = event.previousContainer.data.indexOf(draggedItem);
      const filteredCurrentIndex = currentIndex;

      transferArrayItem(event.previousContainer.data, event.container.data, filteredPreviousIndex, filteredCurrentIndex);
    }
  }

  disableOption(item: string, currentIndex: number, fieldType: 'from' | 'to'): boolean {
    return this.globalService.disableOption(item, currentIndex, fieldType, this.getTenorRangeFormArray);
  }

}
