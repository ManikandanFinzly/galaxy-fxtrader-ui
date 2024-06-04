import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from 'globals.service';
import { Observable, throwError,  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TradingTiersService {

  apiUrl = '/fxtrader/tradingtier';

  constructor(private http: HttpClient, private global: Globals) { }

  private jsonUrl = 'assets/tradingTier.json';

  public getTradingTier(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }

  public getDefaultPriceNameById(id) {
    return 'Flat 1%';
  }

  public getAllTradingTier(isParent:boolean){
    return (this.http.get(`${this.apiUrl}?is-parent=${isParent}`));
  }

  public getTradingTierById(id: string){
    return (this.http.get(`${this.apiUrl}/${id}`));
  }

  deleteTradingTier(id: string, tierItemId: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('tier-item-id', tierItemId);
    return this.http.delete(url, { headers, params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }

}