import { HttpClient } from "@angular/common/http";
import {Injectable} from "@angular/core";

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
}

