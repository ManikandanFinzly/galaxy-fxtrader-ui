import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SpreadUnit } from 'app/fx-pricing-tiers/SpreadUnit';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-add-edit-trading-tiers',
  templateUrl: './add-edit-trading-tiers.component.html',
  styleUrls: ['./add-edit-trading-tiers.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddEditTradingTiersComponent implements OnInit {

  constructor(public apiService: ApiService) {  
    console.log("Add Trading Tiers...")
    try{
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
      this.apiService.get(ApiService.STATIC_DATA_PROP_CONFIG+"IndexTenors").subscribe(  
        (response) => {
          console.log("response=====>", JSON.stringify(response));
        },
        (error) => {
          console.error("Error fetching data:", error);
        }
      );

      // MARKETDATA_PROVIDER
      this.apiService.get(ApiService.STATIC_DATA_PROP_CONFIG+"MARKETDATA_PROVIDER").subscribe(  
        (response) => {
          console.log("response=====>", JSON.stringify(response));
        },
        (error) => {
          console.error("Error fetching data:", error);
        }
      );

      // Channel
      this.apiService.get(ApiService.STATIC_DATA_PROP_CONFIG+"Channel").subscribe(  
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
      this.apiService.post(ApiService.StaticData_URL+"currency-pairs/search?page=0&size=10",Obj).subscribe(  
        (response) => {
          console.log("response=====>", JSON.stringify(response));
        },
        (error) => {
          console.error("Error fetching data:", error);
        }
      );

    }catch(e){
      console.log("Exception in Add Trading Tiers", e)
    }
  }

  ngOnInit() {
  }

}
