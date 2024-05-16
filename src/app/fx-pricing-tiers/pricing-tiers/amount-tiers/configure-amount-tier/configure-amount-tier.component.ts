import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configure-amount-tier',
  templateUrl: './configure-amount-tier.component.html',
  styleUrls: ['./configure-amount-tier.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ConfigureAmountTierComponent implements OnInit {
  errorMessage: string = '';
  tierName: string = '';
  configAmountTierFormList: FormGroup[] = [];
  spreadUnits = [
    { value: 'pips', viewValue: 'Pips' },
    { value: 'percentage', viewValue: '%' },
    { value: 'usDollar', viewValue: 'US Dollar' },
    { value: 'dealerIntervention', viewValue: 'Dealer Intervention (DI)' }
  ];
  tierAmounts: string[] = ['Foreign Ccy', 'Quote Ccy', 'Book Ccy', 'Base Ccy'];
  selectedTier: string = 'Book Ccy';

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.addRow();
  }

  addRow(): void {
    let newRow = this.formBuilder.group({
      fromAmount: ['', Validators.required],
      toAmount: ['', [Validators.required]],
      bankBuys: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      bankSells: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      spreadUnits: ['', Validators.required],
    });
    newRow.setValidators(this.amountPrediction());
    this.configAmountTierFormList.push(newRow);
  }

  amountPrediction(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      if (group.controls) {
        const updatedFromAmount = group.controls['fromAmount'];
        const updatedToAmount = group.controls['toAmount'];
        if (updatedFromAmount.value >= updatedToAmount.value) {
          updatedToAmount.setErrors({ invalidToAmountRange: true });
        }

        const lastUpdatedRow = this.configAmountTierFormList[this.configAmountTierFormList.length - 2];
        if (lastUpdatedRow) {
          const lastUpdatedToAmount = lastUpdatedRow.controls.toAmount.value;
          if (lastUpdatedToAmount >= updatedFromAmount.value) {
            updatedFromAmount.setErrors({ invalidFromAmountRange: true });
          }
          console.log("lastUpdatedRow::::::::::", lastUpdatedRow);
        }
        return;
      };
    }
  }
  // if (form && form.controls) {
  //   const updatedFromAmount = form.controls.fromAmount.value;
  //   const updatedToAmount = form.controls.toAmount.value;
  //   if (updatedFromAmount !== '' && updatedToAmount !== '') {
  //     if (updatedFromAmount >= updatedToAmount) {
  //       return { invalidRange: true };
  //     }
  //   }
  //   return null;
  // }

  //this.configAmountTierFormList[this.configAmountTierFormList.length - 1].getRawValue();
  //const lastUpdatedFromAmount = lastUpdatedRow

  deleteItem(index: number): void {
    this.configAmountTierFormList.splice(index, 1);
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

  addAmountRangeRow() {
    const lastRow = this.configAmountTierFormList[this.configAmountTierFormList.length - 1];
    const lastRowValues = lastRow.getRawValue();
    const allFieldsFilled = Object.values(lastRowValues).every(value => value !== null && value !== '' && value !== undefined);
    const hasErrors = this.configAmountTierFormList.some(formGroup =>
      formGroup.invalid ||
      !formGroup.get('fromAmount').value ||
      !formGroup.get('toAmount').value ||
      !formGroup.get('bankBuys').value ||
      !formGroup.get('bankSells').value ||
      !formGroup.get('spreadUnits').value
    );
    if (allFieldsFilled && !hasErrors) {
      this.errorMessage = '';
      this.addRow();
    } else {
      this.errorMessage = 'All fields in the previous row must be filled to add a new row.';
    }
  }


  cancel() {
    this.router.navigate(['/amount-tiers']);
  }

  resetForm() {
    this.configAmountTierFormList.forEach(formGroup => {
      formGroup.reset({
        fromAmount: null,
        toAmount: null,
        bankBuys: null,
        bankSells: null,
        spreadUnits: ''
      });
      formGroup.markAsUntouched();
    });
  }

  save() {
    this.errorMessage = '';
    const hasErrors = this.configAmountTierFormList.some(formGroup =>
      formGroup.invalid ||
      !formGroup.get('fromAmount').value ||
      !formGroup.get('toAmount').value ||
      !formGroup.get('bankBuys').value ||
      !formGroup.get('bankSells').value ||
      !formGroup.get('spreadUnits').value
    );
    if (!this.tierName.trim()) {
      this.errorMessage = 'Please enter the Tire Name.';
    } else if (hasErrors) {
      this.errorMessage = 'error in the amount range.';
    }
    if (!hasErrors && this.errorMessage == '') {
      console.log("GOOD TO SAVE...!!!")

      let obj: any = {
        tierName: this.tierName,
        tierAmounts: this.selectedTier,
        amountTiers: this.configAmountTierFormList.map(formGroup => {
          return {
            fromAmount: formGroup.get('fromAmount').value,
            toAmount: formGroup.get('toAmount').value,
            bankBuys: formGroup.get('bankBuys').value,
            bankSells: formGroup.get('bankSells').value,
            spreadUnits: formGroup.get('spreadUnits').value
          };
        })
      };
      console.log("Print Object :::", obj);
      // this.http.get("URL", obj).subscribe({

      // })
    }
  }

}
