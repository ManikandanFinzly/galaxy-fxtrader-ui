import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.error.message || error.message);
    return throwError('Something bad happened; please try again later.');
  }

  public static STATIC_DATA_PROP_CONFIG = "/staticdata/property-config/";
  public static LE_URL='/legalentity/';
  public static DOCUMENT_URL='/documents/documents/';
  public static APPSTORE_URL='/appstore/';
  public static CONFIRMS_URL="/confirms/rfq/"
  public static StaticData_URL="/staticdata/"
  public static FEE_URL="/fee-service/service/"
  public static DEPOSIT_URL="/deposit/"
  public static PAYMENT_URL="/payment-service/"
  public static account_url="/castlemock/mock/rest/project/LqsKOZ/application/nG4r5L/accounts/"
  public static SELECTED_COST_CENTER=null;
  public static OTP_URL="/admin/v1/otp";
  public static ADMIN_URL="/admin/";




  // HTTP calls

  get(url: string, options?: any): Observable<any> {
    return this.http.get<any>(url, options).pipe(
      map((response: any) => response),
      catchError(this.handleError),
    );
  }

  post(url: string, body: any | null, options?: any): Observable<any> {
    return this.http.post<any>(url, body, options).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put<any>(url, body, { responseType: 'json' });
  }

  delete(url: string): Observable<any> {
    return this.http.delete<any>(url, { responseType: 'json' });
  }


}
