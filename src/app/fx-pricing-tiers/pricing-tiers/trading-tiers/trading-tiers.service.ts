import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from 'globals.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TradingTiersService {

  constructor(private http: HttpClient, private global: Globals) { }

  private jsonUrl = 'assets/tradingTier.json';

  public getTradingTier(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }

  public getTradingTierById(id: any): Observable<any | undefined> {
    return this.getTradingTier().pipe(
      map(items => items.find(item => item.id === id))
    );
  }

  public getDefaultPriceNameById(id) {
    return 'Flat 1%';
  }
}