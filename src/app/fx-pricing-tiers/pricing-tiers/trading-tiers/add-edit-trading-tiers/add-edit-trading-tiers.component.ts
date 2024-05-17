import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpreadUnit } from 'app/fx-pricing-tiers/SpreadUnit';
import { ApiService } from 'app/services/api.service';
import { TradingTiersService } from '../trading-tiers.service';
import { MatDialogRef } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-add-edit-trading-tiers',
  templateUrl: './add-edit-trading-tiers.component.html',
  styleUrls: ['./add-edit-trading-tiers.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddEditTradingTiersComponent implements OnInit {

  showSecondSection: boolean = false;
  tradingTierForm: FormGroup;
  from: string[] = ['00:00', '23:00'];
  to: string[] = ['00:00', '23:00'];
  rateSources: string[] = ['Online', 'Offline'];
  defaultPrices = ['Flat 2%', 'Flat 3%'];
  tenorOptions: string[] = ['Spot', '1M', '3M', '6M', '1Y'];
  availableCCYPairs: any = [];
  selectedCCYPairs: any = [];
  isFirstPage: boolean;

  constructor(private dialogRef: MatDialogRef<AddEditTradingTiersComponent>, public apiService: ApiService, private fb: FormBuilder, private tradingTier: TradingTiersService) {
    this.tradingTierForm = this.fb.group({
      tierName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      allDay: [true],
      fromTime: ['', Validators.required],
      toTime: ['', Validators.required],
      rateSource: ['', Validators.required],
      defaultPrice: ['', Validators.required],
      noQuoteMessage: ['', Validators.required],
      availableCCYPairsSearch: [''],
      selectedCCYPairsSearch: [''],
      tenorRange: this.fb.array([]),
    });
    console.log("Add Trading Tiers...")
    try {
      let SpreadUnitsList = [];
      SpreadUnitsList = Object.values(SpreadUnit);
      console.log(SpreadUnitsList);

      // getApi
      // this.apiService.get("https://dummyjson.com/products/1").subscribe(
      // this.apiService.get("http://banka-bankos-dev.local.net/fxtrader/salestier/1").subscribe(  
      //   (DummyResponse) => {
      //     console.log("DummyResponse=====>", JSON.stringify(DummyResponse));
      //   },
      //   (error) => {
      //     console.error("Error fetching data:", error);
      //   }
      // );



      // IndexTenors
      this.apiService.get(ApiService.STATIC_DATA_PROP_CONFIG + "IndexTenors").subscribe(
        (response) => {
          console.log("response=====>", JSON.stringify(response));
        },
        (error) => {
          console.error("Error fetching data:", error);
        }
      );

      // MARKETDATA_PROVIDER
      this.apiService.get(ApiService.STATIC_DATA_PROP_CONFIG + "MARKETDATA_PROVIDER").subscribe(
        (response) => {
          console.log("response=====>", JSON.stringify(response));
        },
        (error) => {
          console.error("Error fetching data:", error);
        }
      );

      // Channel
      this.apiService.get(ApiService.STATIC_DATA_PROP_CONFIG + "Channel").subscribe(
        (response) => {
          console.log("response=====>", JSON.stringify(response));
        },
        (error) => {
          console.error("Error fetching data:", error);
        }
      );

      // currency-pairs
      let variable = {};
      let Obj = {
        "searchQuery": {},
        "defaultFilter": false,
        "simpleSearch": true,
        "searchCriteria": JSON.stringify(variable),
        "entityName": "currencypair"
      }
      this.apiService.post(ApiService.StaticData_URL + "currency-pairs/search?page=0&size=10", Obj).subscribe(
        (response) => {
          console.log("response=====>", JSON.stringify(response));
        },
        (error) => {
          console.error("Error fetching data:", error);
        }
      );

    } catch (e) {
      console.log("Exception in Add Trading Tiers", e)
    }
  }

  ngOnInit() {
    this.getCCYPair();
    this.addTenor();
  }

  getCCYPair() {
    this.tradingTier.getCCYPair().subscribe(data => {
      if (data && Array.isArray(data)) {
        const uniqueCCYPairs = data
          .map(item => item.ccyPair)
          .filter(ccyPair => !this.selectedCCYPairs.includes(ccyPair));
        this.availableCCYPairs = uniqueCCYPairs;
      }
    });
  }

  get tenorRanges(): FormArray {
    return this.tradingTierForm.get('tenorRange') as FormArray;
  }



  createTenorGroup(): FormGroup {
    return this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      price: ['']
    });
  }

  addTenor(): void {
    this.tenorRanges.push(this.createTenorGroup());
  }

  removeTenor(index: number): void {
    this.tenorRanges.removeAt(index);
  }

  toggleSection() {
    this.showSecondSection = !this.showSecondSection;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  onPreviousButtonClick() {
    this.setDefualtPrice();
    this.showSecondSection = !this.showSecondSection;
    console.log(this.tradingTierForm);

  }

  setDefualtPrice() {
    const formArray = this.tradingTierForm.get('tenorRange') as FormArray;
    formArray.controls.forEach(control => {
      console.log('Price value' + control.get('price').value);
      if (control.get('price').value == '') {
        control.get('price').setValue(this.tradingTierForm.get('defaultPrice').value);
      }
    });
    console.log(this.tradingTierForm);

  }

  get filteredAvailableCCYPairs(): string[] {
    return this.availableCCYPairs.filter(item => item.toLowerCase().includes(this.tradingTierForm.get('availableCCYPairsSearch').value.toLowerCase()));
  }

  get filteredSelectedCCYPairs(): string[] {
    return this.selectedCCYPairs.filter(item => item.toLowerCase().includes(this.tradingTierForm.get('selectedCCYPairsSearch').value.toLowerCase()));
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
