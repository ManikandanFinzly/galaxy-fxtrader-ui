import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { AddEditTradingTiersComponent } from '../add-edit-trading-tiers/add-edit-trading-tiers.component';
import { ConfirmationDialogComponent } from 'app/globalModules-components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-trading-tiers',
  templateUrl: './trading-tiers.component.html',
  styleUrls: ['./trading-tiers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TradingTiersComponent implements OnInit {

  tierList:any=[
    {
      type:"Normal",
      id:1,
      amount:1200
    },
    {
      type:"Gold",
      id:2,
      amount:1500
    },
    {
      type:"Platinum",
      id:3,
      amount:1800
    }
  ];

  tierTableList=[
    {
      spot:"2%",oneMonth:"3%",threeMonth:"2%",fiveMonth:"3%", year:"Dealer"
    },
    {
      spot:"2%",oneMonth:"3%",threeMonth:"2%",fiveMonth:"3%", year:"Dealer"
    },
    {    
      spot:"2%",oneMonth:"3%",threeMonth:"2%",fiveMonth:"3%", year:"Dealer"
    }
  ]

  constructor(private router: Router, public dialog: MatDialog) {
    console.log("trading tier called...");
  }

  ngOnInit() {
  }


  addIndividualTiers(){
    console.log("addIndividualTiers");
    //this.router.navigate(['trading-tiers/add']);
    const dialogRef = this.dialog.open(AddEditTradingTiersComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEnableTradingTier(index: number) {
    this.openConfirmationDialog('enable', index);
  }

  openDisableTradingTier(index: number){
    this.openConfirmationDialog('disable', index);
  }

  openCopyConfirmationDialog(index: number) {
    this.openConfirmationDialog('copy', index);
  }

  openDeleteConfirmationDialog(index: number) {
    this.openConfirmationDialog('delete', index);
  }

  openConfirmationDialog(action: string, index: number) {
    const reqdata = [];
    reqdata['action'] = action;
    reqdata['displayName'] = "Trading Tier";
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      height: '350px',
      data: { reqdata }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.action === 'delete') {
          
          console.log("Delete action is called.")
        } else if (result.action === 'copy' && result.formValue) {
          
          console.log('Form Value:', result.formValue);
        } else if (result.action === 'enable') {
          console.log("Enable action is success");
        } else if (result.action === 'disable') {
          console.log("Disable action is success");
        }
        console.log(`Dialog result: ${result}`);
      }
    });
  }

}
