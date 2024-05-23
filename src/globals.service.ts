import { HttpClient } from "@angular/common/http";
import {Injectable} from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";

/*
    Just a simple service that keeps some global variables.
 */

@Injectable()
export class Globals {
    constructor(private http: HttpClient) { }

    tabName: string="";
    SALES_TIERS_CONSTANT="Sales Tiers";
    TRADING_TIERS_CONSTANT="Trading Tiers";
    AMOUNT_TIERS_CONSTANT="Amount Tiers";
    RATE_SOURCE_CONSTANT="Rate Source";
    globalEventDistributor:any;
    LE_URL='/legalentity/';
    DOCUMENT_URL='/documents/documents/';
    APPSTORE_URL='/appstore/';
    CONFIRMS_URL="/confirms/rfq/"
    StaticData_URL="/staticdata/"
    FEE_URL="/fee-service/service/"
    DEPOSIT_URL="/deposit/"
    PAYMENT_URL="/payment-service/"
    account_url="/castlemock/mock/rest/project/LqsKOZ/application/nG4r5L/accounts/"
    SELECTED_COST_CENTER=null;
    OTP_URL="/admin/v1/otp";
    ADMIN_URL="/admin/";

    markFormGroupTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if (control instanceof FormGroup) {
              this.markFormGroupTouched(control);
            } else if (control instanceof FormArray) {
              control.controls.forEach((group: FormGroup) => this.markFormGroupTouched(group));
            }
        });
    }

    tenorRanges: Map<string, string> = new Map([
      ['ON', '1'],
      ['TN', '2'],
      ['SPOT', '3'],
      ['1D', '4'],
      ['2D', '5'],
      ['3D', '6'],
      ['1W', '7'],
      ['2W', '8'],
      ['3W', '9'],
      ['1M', '10'],
      ['2M', '11'],
      ['3M', '12'],
      ['6M', '13'],
      ['9M', '14'],
      ['1Y', '15'],
      ['18M', '16'],
      ['2Y', '17'],
      ['3Y', '18'],
      ['4Y', '19'],
      ['5Y', '20'],
      ['6Y', '21'],
      ['7Y', '22'],
      ['8Y', '23'],
      ['9Y', '24'],
      ['10Y', '25'],
      ['12Y', '26'],
      ['15Y', '27'],
      ['20Y', '28'],
      ['25Y', '29'],
      ['30Y', '30'],
      ['40Y', '31'],
      ['50Y', '32'],
    ]);

    disableOption(item: string, currentIndex: number, fieldType: 'from' | 'to', form: FormArray): boolean {
      const itemValue = this.convertKeyToValue(item);
      let isDisabled = false;
  
      const control = form;
      const lastTier = control.at(currentIndex);
      let currentFrom = this.convertKeyToValue(lastTier.get('from').value);
      let currentTo = this.convertKeyToValue(lastTier.get('to').value);
  
      let maxFrom = 1;
      let minTo = 32;
  
      form.controls.forEach((control, key) => {
        const from = this.convertKeyToValue(control.get('from').value);
        const to = this.convertKeyToValue(control.get('to').value);
  
  
        if(currentIndex !== key){
          if(itemValue > from && itemValue < to){
            isDisabled = true;
          }
  
          if(fieldType == 'from'){
            if(itemValue === from){
              isDisabled = true;
            }
            if(currentTo > to && itemValue < to){
              isDisabled = true;
            }
            
          }
          else if (fieldType === 'to') {
            if(itemValue === to){
              isDisabled = true;
            }
            if(currentFrom < from && itemValue > from){
              isDisabled = true;
            }
          }
        }
        else{
          if(fieldType == 'from'){
            if(to != 0 && itemValue >= to){
              isDisabled = true;
            }
            if(key != 0 && to && to >=minTo && itemValue < minTo){
              isDisabled = true;
            }
          }
          else if (fieldType === 'to') {
            if(itemValue <= from){
              isDisabled = true;
            }
            if(key !=0 && from <= maxFrom && itemValue > maxFrom){
              isDisabled = true; 
            }
          }
        }
  
        if(from > maxFrom){
          maxFrom = from;
        }
        if(to < minTo){
          minTo = to;
        }
      });
  
      return isDisabled;
  
    }
  
    convertKeyToValue(key: string): number | undefined {
      const value = this.tenorRanges.get(key);
      return value ? Number(value) : undefined;
    }
}