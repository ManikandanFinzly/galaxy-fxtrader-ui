import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Globals } from 'globals.service';
import { AddEditTradingTiersComponent } from '../pricing-tiers/trading-tiers/add-edit-trading-tiers/add-edit-trading-tiers.component';
import { Router } from '@angular/router';
import { AddEditSalesTierComponent } from '../pricing-tiers/sales-tiers/add-edit-sales-tier/add-edit-sales-tier.component';


@Component({
  selector: 'app-landing-component',
  templateUrl: './landing-component.component.html',
  styleUrls: ['./landing-component.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponentComponent implements OnInit {

  fontStyleControl:any=this.globals.SALES_TIERS_CONSTANT; 
  @Output() tabName = new EventEmitter<string>();
  constructor(public globals: Globals,  public dialog: MatDialog, private router: Router) {
    this.globals.tabName = this.globals.SALES_TIERS_CONSTANT;
  }

  ngOnInit() {
  }

  clicktab(tabValue){
    this.globals.tabName = tabValue
  }

  addIndividualTiers(){
    console.log("addIndividualTiers()==>")
    // this.tabName.emit(this.globals.tabName);
    if(this.globals.tabName == this.globals.SALES_TIERS_CONSTANT){
      const dialogRef = this.dialog.open(AddEditSalesTierComponent,{width: '500px',
      height: '90vh', panelClass: 'custom-dialog-container'});
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      }); 
    }else if(this.globals.tabName == this.globals.TRADING_TIERS_CONSTANT){
      const dialogRef = this.dialog.open(AddEditTradingTiersComponent,{width: '400px',
      height: '500px', panelClass: 'custom-dialog-container'});
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }else if(this.globals.tabName == this.globals.RATE_SOURCE_CONSTANT){

    }else if(this.globals.tabName == this.globals.AMOUNT_TIERS_CONSTANT){
      this.router.navigate(['amount-tiers/configureAmountTier']);
    }
  }

}
