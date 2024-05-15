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
}

