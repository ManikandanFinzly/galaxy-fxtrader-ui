import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from 'globals.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesTiersService {

  goldTier = {
    tierName: 'Gold',
    tenorRange: [
      { from: 'TN', to: 'TN', price: 'Flat 2%'},
      { from: 'ON', to: 'TN', price: 'Flat 3%'}
    ],
    defaultPrice: 'Flat 1%',
    applicableChannel: ['ONLINE', 'FXDESK']
  };

  constructor(private http: HttpClient, private global: Globals) { }

  public getSalesTierById(id){
    return this.goldTier;
  }

  public getCCYGroupById(id){
    return this.goldTier;
  }
}
