import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { SalesTiersService } from '../sales-tiers.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-add-edit-sales-tier',
  templateUrl: './add-edit-sales-tier.component.html',
  styleUrls: ['./add-edit-sales-tier.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditSalesTierComponent implements OnInit {

  goldTier = {
    tierName: 'Gold',
    tenorRange: [
      { from: 'TN', to: 'TN', price: 'Flat 2%'},
      { from: 'ON', to: 'TN', price: 'Flat 3%'}
    ],
    defaultPrice: 'Flat 1%',
    applicableChannel: ['Online', 'Channel1']
  };

  isDefaultSalesTier = false;
  isFirstPage = true

  tenorsList:any;
  defaultPricesList = ['Flat 1%', 'Flat 2%', 'Flat 3%']
  applicableChannelsList = ['Online', 'Channel1', 'Channel2', 'Channel3','Channel4', 'Channel5', 'Channel6','Channel7', 'Channel8', 'Channel9']
  availableCCYPairs:any = [];
  selectedCCYPairs:any = [];

  configSalesTierForm: FormGroup;


  constructor(private dialogRef: MatDialogRef<AddEditSalesTierComponent>, private _formBuilder: FormBuilder, private salesService: SalesTiersService) { }

  ngOnInit() {
    this.getCCYPair();
    this.getTenor();
    this.initializeForm(this.goldTier);
  }

  getCCYPair() {
    this.salesService.getCCYPair().subscribe(data => {
      if (data && Array.isArray(data)) {
        const uniqueCCYPairs = data
          .map(item => item.ccyPair)
          .filter(ccyPair => !this.selectedCCYPairs.includes(ccyPair));
        this.availableCCYPairs = uniqueCCYPairs;
      }
    });
  }

  getTenor() {
    this.salesService.getTenor().subscribe((data:any) => {
      if (data) {  
        this.tenorsList = (data.value).split(',');
      }
    });
  }
  
  initializeForm(object?: any) {
    this.configSalesTierForm = this._formBuilder.group({
      tierName: [object ? object.tierName : '', Validators.required], 
      tenorRange: this._formBuilder.array([]),
      defaultPrice: [object ? object.defaultPrice : '', Validators.required],
      applicableChannel: [object ? object.applicableChannel : [], Validators.required],
      availableCCYPairsSearch: [''],
      selectedCCYPairsSearch: [''],
    });

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
        console.log("Please enter values for 'From' and 'To' before adding a new tier.");
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
      console.log('Form is invalid');
    }
  }

  setDefualtPrice(){
    const formArray = this.configSalesTierForm.get('tenorRange') as FormArray;
    formArray.controls.forEach(control => {
      console.log('Price value'+control.get('price').value);
      if (control.get('price').value === '') {
        control.get('price').setValue(this.configSalesTierForm.get('defaultPrice').value);
      }
    });
  }

  onSaveButtonClick(){
    if (this.configSalesTierForm.valid && this.selectedCCYPairs.length!=0) {
      const formValues = this.configSalesTierForm.value;
      console.log('Form Values:', formValues);  
      console.log(this.selectedCCYPairs);
      this.closeModal();
    } else {
      this.markFormGroupAsTouched(this.configSalesTierForm);
      console.log('Form is invalid');
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
