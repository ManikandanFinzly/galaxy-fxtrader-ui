import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from 'globals.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesTiersService {

  private jsonUrl = 'assets/salesTier.json';

  constructor(private http: HttpClient, private global: Globals) { }

  public getSalesTier(): Observable<any[]>{
    return this.http.get<any[]>(this.jsonUrl);
  }


  public getDefaultPriceNameById(id){
    return 'Flat 1%';
  }

  public getAllSalesTier(isParent:boolean){
    console.log("IN Service calling getAllSalesTier:")
    return (this.http.get(`/fxtrader/salestier?isParent=${isParent}`));
  }

  public getSalesTierById(id: string){
    return (this.http.get(`/fxtrader/salestier/${id}`));
  }

  public createSalesTier(data) {
    return this.http.post(`/fxtrader/salestier`, data);
  }

  public createSalesTierItem(tierId, data) {
    return this.http.post(`/fxtrader/salestieritem/${tierId}`, data);
  }

  public updateSalesTierItem(tierId, data) {
    return this.http.put(`/fxtrader/salestieritem/${tierId}`, data);
  }
}
