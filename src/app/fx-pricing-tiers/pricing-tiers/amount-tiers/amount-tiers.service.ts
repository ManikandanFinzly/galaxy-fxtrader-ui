import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AmountTiersService {

  constructor( private http: HttpClient,) { }

  public getAmountTier() {
    return this.http.get("./assets/data/AmountTier.json");
  }
}
