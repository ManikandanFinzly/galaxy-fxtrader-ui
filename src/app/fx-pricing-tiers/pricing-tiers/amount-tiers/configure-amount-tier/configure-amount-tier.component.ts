import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from 'globals.service';

@Component({
  selector: 'app-configure-amount-tier',
  templateUrl: './configure-amount-tier.component.html',
  styleUrls: ['./configure-amount-tier.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ConfigureAmountTierComponent implements OnInit {
  configAmountTierForm: FormGroup;
  spreadUnits = [
    { value: 'pips', viewValue: 'Pips' },
    { value: 'percentage', viewValue: '%' },
    { value: 'usDollar', viewValue: 'US Dollar' },
    { value: 'dealerIntervention', viewValue: 'Dealer Intervention (DI)' }
  ];
  tierAmounts: string[] = ['Foreign Ccy', 'Quote Ccy', 'Book Ccy', 'Base Ccy'];
  selectedTier: string = 'Book Ccy';
  tierName: any;

  constructor(private formBuilder: FormBuilder, private router: Router, public globalService: Globals) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.configAmountTierForm = this.formBuilder.group({
      tierName: ['', Validators.required],
      amountTier: this.formBuilder.array([this.createAmountTier()])
    });
  }
  get amountTier(): FormArray {
    return this.configAmountTierForm.get('amountTier') as FormArray;
  }

  createAmountTier(): FormGroup {
    const newRow = this.formBuilder.group({
      fromAmount: ['', Validators.required],
      toAmount: ['', Validators.required],
      bankBuys: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      bankSells: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      spreadUnits: ['', Validators.required],
    });
    newRow.setValidators(this.amountPrediction());
    return newRow;
  }

  addAmountRangeRow() {
    const lastRow = this.amountTier.at(this.amountTier.length - 1) as FormGroup;
    if (lastRow.invalid) {
      this.globalService.markFormGroupTouched(lastRow);
      return;
    }
    this.amountTier.push(this.createAmountTier());
  }

  removeAmountRangeRow(index: number) {
    this.amountTier.removeAt(index);
  }

  amountPrediction(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      if (group.controls) {
        const updatedFromAmount = group.controls['fromAmount'];
        const updatedToAmount = group.controls['toAmount'];
        if (updatedFromAmount.value >= updatedToAmount.value) {
          updatedToAmount.setErrors({ invalidToAmountRange: true });
        }

        const lastUpdatedRow = this.amountTier.at(this.amountTier.length - 2);
        if (lastUpdatedRow) {
          const lastUpdatedToAmount = lastUpdatedRow.get('toAmount').value;
          if (lastUpdatedToAmount >= updatedFromAmount.value) {
            updatedFromAmount.setErrors({ invalidFromAmountRange: true });
          }
        }
        return;
      }
    };
  }

  increment(formGroup, fieldName) {
    const currentValue = parseInt(formGroup.get(fieldName).value, 10) || 0;
    formGroup.get(fieldName).setValue(currentValue + 1);
  }

  decrement(formGroup, fieldName) {
    const currentValue = parseInt(formGroup.get(fieldName).value, 10) || 0;
    if (currentValue > 0) {
      formGroup.get(fieldName).setValue(currentValue - 1);
    }
  }

  cancel() {
    this.router.navigate(['/amount-tiers']);
  }

  resetForm() {
      // Reset the form to its initial state
      this.configAmountTierForm.reset();   
      
      // Remove all rows except the first one
      while (this.amountTier.length > 1) {
        this.amountTier.removeAt(1);
      }
      this.configAmountTierForm.updateValueAndValidity({ onlySelf: true, emitEvent: false });
  }

  onSubmit() {
    debugger
    // const nameControl = this.configAmountTierForm.get('tierName');  
    // if (!nameControl.value) {
    //   nameControl.setErrors({ required: true });
    //   return;
    // }
    if (this.configAmountTierForm.valid) {
      console.log(this.configAmountTierForm.value);
      let obj: any = {
        // tierName: this.tierName,
        tierAmounts: this.selectedTier,
        amountTiers: this.amountTier.controls.map((control) => {
          const group = control as FormGroup;
          return {
            fromAmount: group.get('fromAmount').value,
            toAmount: group.get('toAmount').value,
            bankBuys: group.get('bankBuys').value,
            bankSells: group.get('bankSells').value,
            spreadUnits: group.get('spreadUnits').value,
          };
        }),
      };
      console.log("Print Object :::", obj);
  }
}

}