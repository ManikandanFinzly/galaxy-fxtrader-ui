import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from 'globals.service';
import { AmountTiersService } from '../amount-tiers.service';

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
  tierAmounts: { value: number; viewValue: string; }[] = [
    { value: 1, viewValue: 'Foreign Ccy' },
    { value: 2, viewValue: 'Quote Ccy' },
    { value: 3, viewValue: 'Book Ccy' },
    { value: 4, viewValue: 'Base Ccy' }
  ];
  defaultSelectedTier: number = 3; // Default selected value for tierAmounts
  selectedTier: number;
  tierName: any;
  isEditMode: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, public globalService: Globals,
    public amountTiersService: AmountTiersService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.initializeForm();
    this.selectedTier = this.configAmountTierForm.get('selectedTier').value;//for the lable color change
  }

  initializeForm() {
    const responseData = this.route.snapshot.queryParams['param1'];
    if (responseData) {
      const selectedRowValues = JSON.parse(responseData);
      this.configAmountTierForm = this.formBuilder.group({
        tierName: [selectedRowValues ? selectedRowValues.tierName || '' : '', Validators.required],
        selectedTier: [selectedRowValues ? selectedRowValues.inTermsOf || '' : '', Validators.required],
        amountTier: this.formBuilder.array([])
      });

      let amountTierArray = this.configAmountTierForm.get('amountTier') as FormArray;
      selectedRowValues.amountRanges.forEach(range => {
        amountTierArray.push(this.createAmountTierWithValues(range));
      });
      this.isEditMode = true;
    } else {
      this.configAmountTierForm = this.formBuilder.group({
        tierName: ['', Validators.required],
        selectedTier: [this.defaultSelectedTier],
        amountTier: this.formBuilder.array([this.createAmountTier()])
      });
    }
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

  createAmountTierWithValues(range: any): FormGroup {
    return this.formBuilder.group({
      fromAmount: [range.fromAmount || '', Validators.required],
      toAmount: [range.toAmount || '', Validators.required],
      bankBuys: [range.bankBuys || '', [Validators.required, Validators.pattern('^[0-9]*$')]],
      bankSells: [range.bankSells || '', [Validators.required, Validators.pattern('^[0-9]*$')]],
      spreadUnits: [range.spreadUnits || '', Validators.required],
    });
  }

  get amountTier(): FormArray {
    return this.configAmountTierForm.get('amountTier') as FormArray;
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
    const tierNameValue = this.configAmountTierForm.get('tierName').value;
    this.configAmountTierForm.reset();
    if (this.isEditMode) {
      this.configAmountTierForm.patchValue({ tierName: tierNameValue });
    }
    this.configAmountTierForm.patchValue({ selectedTier: this.defaultSelectedTier });
    this.selectedTier = this.defaultSelectedTier; //for the lable color change
    // Remove all rows except the first one
    while (this.amountTier.length > 1) {
      this.amountTier.removeAt(1);
    }
  }

  onSubmit() {
    if (this.configAmountTierForm.valid) {
      let obj: any = {
        tierName: this.configAmountTierForm.get('tierName').value,
        inTermsOf: this.configAmountTierForm.get('selectedTier').value,
        amountRanges: this.amountTier.controls.map((control) => {
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