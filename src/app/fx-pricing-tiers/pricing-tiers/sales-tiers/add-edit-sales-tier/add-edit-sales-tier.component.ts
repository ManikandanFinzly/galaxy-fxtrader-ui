import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SalesTiersService } from '../sales-tiers.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-add-edit-sales-tier',
  templateUrl: './add-edit-sales-tier.component.html',
  styleUrls: ['./add-edit-sales-tier.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditSalesTierComponent implements OnInit {

  salesTierId;
  ccyGroupId;
  salesTierData;
  ccyGroupData;
  isDefaultSalesTier = false;
  isFirstPage = true;
  isTierNameEditable = true;;

  tenorsList:any;
  defaultPricesList = ['Flat 1%', 'Flat 2%', 'Flat 3%']
  applicableChannelsList = []
  availableCCYPairs:any = [];
  selectedCCYPairs:any = [];

  configSalesTierForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<AddEditSalesTierComponent>,
   private _formBuilder: FormBuilder, private salesService: SalesTiersService, private apiService: ApiService) {
    if(data && data.isDefaultSalesTier){
      this.isDefaultSalesTier = true;
      if(data.salesTierId){
        this.salesTierId = data.salesTierId;
      }
      else{
        this.isTierNameEditable = false;
      }
    }
    else if(data && !data.isDefaultSalesTier && data.salesTierId){
      this.salesTierId = data.salesTierId;
      this.isDefaultSalesTier = false;
      if(data.ccyGroupId){
        this.ccyGroupId = data.ccyGroupId;
      }
    }
  }

  ngOnInit() {
    this.getApplicableChannels();
    this.getCCYPair();
    this.getTenor();
    this.initializeForm(this.getSalesTierById());
  }

  getSalesTierById(){
    if(this.isDefaultSalesTier && this.salesTierId){
      const data = this.salesService.getSalesTierById(this.salesTierId)
      if(data){
        this.salesTierData = data;
        return this.salesTierData;
      }
    }
    else if(!this.isDefaultSalesTier && this.salesTierId){
      if(this.ccyGroupId){
        const data = this.salesService.getCCYGroupById(this.ccyGroupId);
        if(data){
          this.ccyGroupData = data;
          return this.ccyGroupData;
        }
      }
      const data = this.salesService.getCCYGroupById(this.salesTierId)
      if(data){
        this.ccyGroupData = data;
        return this.ccyGroupData;
      }
    }
    else{
      return null;
    }
  }

  getCCYPair() {
    this.apiService.get(ApiService.StaticData_URL+"currency-pairs").subscribe(  
      (data) => {
      if (data && Array.isArray(data)) {
        const uniqueCCYPairs = data
          .map(item => item.ccyPair)
          .filter(ccyPair => !this.selectedCCYPairs.includes(ccyPair));
        this.availableCCYPairs = uniqueCCYPairs;
      }
    });
  }

  getTenor() {
    this.apiService.get(ApiService.STATIC_DATA_PROP_CONFIG+"IndexTenors").subscribe(  
      (data:any) => {
      if (data) {  
        this.tenorsList = (data.value).split(',');
      }
    });
  }

  getApplicableChannels(){
    this.apiService.get(ApiService.STATIC_DATA_PROP_CONFIG+"Channel").subscribe(  
      (data:any) => {
        this.applicableChannelsList = (data.value).split(',');
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
  }
  
  initializeForm(object?: any) {
    const formGroupConfig: any = {
      tierName: [object ? object.tierName : '', Validators.required],
      tenorRange: this._formBuilder.array([]),
      defaultPrice: [object ? object.defaultPrice : '', Validators.required],
      availableCCYPairsSearch: [''],
      selectedCCYPairsSearch: ['']
    };
    

    if (!this.isDefaultSalesTier) {
      formGroupConfig.applicableChannel = [object ? object.applicableChannel : [], Validators.required];
    }

    this.configSalesTierForm = this._formBuilder.group(formGroupConfig);

    const tenorRangeArray = this.configSalesTierForm.get('tenorRange') as FormArray;
    if (object && object.tenorRange && object.tenorRange.length > 0) {
      object.tenorRange.forEach(tenor => {
        tenorRangeArray.push(this.initTenorRange(tenor));
      });
    }
    else{
      tenorRangeArray.push(this.initTenorRange());
    }    
  }

  initTenorRange(tenorRange?: any) {
    return this._formBuilder.group({
      from: [tenorRange ? tenorRange.from : '', Validators.required],
      to: [tenorRange ? tenorRange.to : '', Validators.required],
      price: [tenorRange ? tenorRange.price : '']
    });
  }


  addTier() {
    const control = this.configSalesTierForm.get('tenorRange') as FormArray;
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
    const control = this.configSalesTierForm.get('tenorRange') as FormArray;
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

  setDefualtPrice(){
    const formArray = this.configSalesTierForm.get('tenorRange') as FormArray;
    formArray.controls.forEach(control => {
      if (control.get('price').value === '') {
        control.get('price').setValue(this.configSalesTierForm.get('defaultPrice').value);
      }
    });
  }

  onSaveButtonClick(){
    if (this.configSalesTierForm.valid) {
      if(!this.isDefaultSalesTier && this.selectedCCYPairs.length == 0){
        this.markFormGroupAsTouched(this.configSalesTierForm);
        return;
      }
      const formValues = this.configSalesTierForm.value;
      console.log('Form Values:', formValues);  
      console.log(this.selectedCCYPairs);
      this.closeModal();
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

  onPreviousButtonClick(){
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

}
