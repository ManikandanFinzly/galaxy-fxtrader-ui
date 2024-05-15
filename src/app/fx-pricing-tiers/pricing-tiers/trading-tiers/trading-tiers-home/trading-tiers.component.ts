import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { AddEditTradingTiersComponent } from '../add-edit-trading-tiers/add-edit-trading-tiers.component';


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

}
