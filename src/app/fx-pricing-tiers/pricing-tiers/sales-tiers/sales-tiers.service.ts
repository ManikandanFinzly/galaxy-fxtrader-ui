import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from 'globals.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesTiersService {

  private jsonUrl = 'assets/salesTier.json';

  constructor(private http: HttpClient, private global: Globals) { }

  public getSalesTier(): Observable<any[]>{
    return this.http.get<any[]>(this.jsonUrl);
  }

  public getSalesTierById(id:any): Observable<any|undefined>{
    return this.getSalesTier().pipe(
      map(items => items.find(item => item.id === id))
    );
  }

  public getDefaultPriceNameById(id){
    return 'Flat 1%';
  }

  public getAllSalesTier(isParent:boolean){
    console.log("IN Service calling getAllSalesTier:")
    return (this.http.get(`/fxtrader/salestier?isParent=${isParent}`));
  }

  public getSalesTierByName(name: string){
    return (this.http.get(`/fxtrader/salestier/${name}`));
  }
}
