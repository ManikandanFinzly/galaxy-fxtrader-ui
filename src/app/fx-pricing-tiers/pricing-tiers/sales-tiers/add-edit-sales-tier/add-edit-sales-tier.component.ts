import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { SalesTiersService } from '../sales-tiers.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ApiService } from 'app/services/api.service';
import { Globals } from 'globals.service';
import { ConfigureAmountTierComponent } from '../../amount-tiers/configure-amount-tier/configure-amount-tier.component';

@Component({
  selector: 'app-add-edit-sales-tier',
  templateUrl: './add-edit-sales-tier.component.html',
  styleUrls: ['./add-edit-sales-tier.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditSalesTierComponent implements OnInit {

  tierId;
  tierName;
  pricingItem;

  isDefaultSalesTier = false;
  isTierNameReadOnly = true;
  isFirstPage = true;

  tenorsList: any;
  defaultPricesList = ['Flat 1%', 'Flat 2%', 'Flat 3%']
  applicableChannelsList = []
  availableCCYPairs: any = [];
  selectedCCYPairs: any = [];

  configSalesTierForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialog: MatDialog, private dialogRef: MatDialogRef<AddEditSalesTierComponent>,
    private _formBuilder: FormBuilder, private salesService: SalesTiersService, private apiService: ApiService,
    private globalService: Globals) {
    if (data && data.isDefaultSalesTier) {
      this.isDefaultSalesTier = true;
      if (data.tierId && data.tierName && data.pricingItem) {
        this.tierId = data.tierId;
        this.tierName = data.tierName;
        this.pricingItem = data.pricingItem;
      }
      else {
        this.isTierNameReadOnly = false;
      }
    }
    else if (data && !data.isDefaultSalesTier && data.tierId && data.tierName) {
      this.isDefaultSalesTier = false;
      this.tierId = data.tierId;
      this.tierName = data.tierName;
      if (data.pricingItem) {
        this.pricingItem = data.pricingItem;
      }
    }
  }

  ngOnInit() {
    this.getApplicableChannels();
    this.getCCYPair();
    this.getTenor();
    this.initializeForm();
  }

  getSalesTierByName(tierName: any) {
    this.salesService.getSalesTierByName(tierName).subscribe(
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

    if (this.tierName) {
      this.configSalesTierForm.patchValue({
        tierName: this.tierName,
      });

      let data = this.pricingItem;

        if (data) {
          this.configSalesTierForm.get('defaultPrice').setValue(this.salesService.getDefaultPriceNameById(data.defaultPrice));

          if (!this.isDefaultSalesTier) {
            this.configSalesTierForm.get('applicableChannel').setValue(data.channels);
          }

          const tenorRangeArray = this.getTenorRangeFormArray;
          while (tenorRangeArray.length) {
            tenorRangeArray.removeAt(0);
          }

          if (data && data.tenors.length > 0) {
            data.tenors.forEach((tenor: any) => {
              tenorRangeArray.push(this.initTenorRange(tenor));
            });
          }

          if (data && data.pricingCcySet && data.pricingCcySet.length > 0) {
            data.pricingCcySet.forEach((ccyPair: any) => {
              this.selectedCCYPairs.push(ccyPair.ccyPair);
            })
          }
        }
    }
  }

  initTenorRange(tenor?: any) {
    return this._formBuilder.group({
      from: [tenor ? tenor.rangeFrom : '', Validators.required],
      to: [tenor ? tenor.rangeTo : '', Validators.required],
      price: [(tenor && tenor.pricingAmount && tenor.pricingAmount.tierName) ? tenor.pricingAmount.tierName : '']
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

  openAmountTier(id){
    const dialogRef = this.dialog.open(ConfigureAmountTierComponent,{width: '80%',
      height: '70%', panelClass: 'custom-dialog-container',
      data: {
      }});
      dialogRef.afterClosed().subscribe(result => {
      
        console.log(`Dialog result: ${result}`);
      });
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

      if(this.isDefaultSalesTier && !this.pricingItem){
        let data:any = {
          name: this.configSalesTierForm.get('tierName').value,
          tierType: 3,
          pricingItem: [{
            isDefault: true,
            tenors: 
              this.getTenorRangeFormArray.value.map((tenor) => ({
                rangeFrom: tenor.from,
                rangeTo: tenor.to
              })),
          }]
        }

        this.salesService.createSalesTier(data).subscribe((result:any) => {
            
        })
      }
      else if(!this.isDefaultSalesTier && !this.pricingItem){
        let data = {
          isDefault: false,
          channels: this.configSalesTierForm.get('applicableChannel').value,
          tenors: 
            this.getTenorRangeFormArray.value.map((tenor) => ({
              rangeFrom: tenor.from,
              rangeTo: tenor.to
            })),
          pricingCcySet: 
            this.selectedCCYPairs.map((ccyPair) => ({
              ccyPair: ccyPair
            }))
        }

        this.salesService.createSalesTierItem(this.tierId, data).subscribe((result:any) => {
          
        })

      }
      
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
