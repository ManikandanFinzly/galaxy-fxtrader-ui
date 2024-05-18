import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from 'globals.service';

@Injectable({
  providedIn: 'root'
})
export class TradingTiersService {

  constructor(private http: HttpClient, private global: Globals) { }

  public getCCYPair() {
    return this.http.get(this.global.StaticData_URL + "currency-pairs");
  }

  public getTenor() {
    return this.http.get(this.global.StaticData_URL + "property-config/IndexTenors");
  }
}
