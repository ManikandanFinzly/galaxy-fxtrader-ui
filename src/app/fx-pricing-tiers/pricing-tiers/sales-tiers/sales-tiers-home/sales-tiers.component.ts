import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SalesTierDeleteConfirmationDialogComponent } from '../sales-tier-delete-confirmation-dialog/sales-tier-delete-confirmation-dialog.component';

@Component({
  selector: 'app-sales-tiers',
  templateUrl: './sales-tiers.component.html',
  styleUrls: ['./sales-tiers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SalesTiersComponent implements OnInit {

  availableColumns = ['USDINR','EURUSD'];
  selectedColumns = [];
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

  defaultTableList = [{
    ccypair:"defualt",spot:"spot",oneMonth:"3%",threeMonth:"2%",fiveMonth:"3%", year:"Dealer"
  },]

  tierTableList=[
    {
      id: 1, ccypair:"AUDUSD",spot:"spot",oneMonth:"3%",threeMonth:"2%",fiveMonth:"3%", year:"Dealer"
    },
    {
      id: 1, ccypair:"EURUSD",spot:"1M-3M",oneMonth:"3%",threeMonth:"2%",fiveMonth:"3%", year:"Dealer"
    },
    {    
      id: 1, ccypair:"GBPUSD",spot:"3M-5M",oneMonth:"3%",threeMonth:"2%",fiveMonth:"3%", year:"Dealer"
    },
    {
      id: 1, ccypair:"JPYUSD",spot:"5M-1Y",oneMonth:"3%",threeMonth:"2%",fiveMonth:"3%", year:"Dealer"
    },
    {    
      id: 1, ccypair:"ZARUSD",spot:"1Y+",oneMonth:"3%",threeMonth:"2%",fiveMonth:"3%", year:"Dealer"
    },
    {
      id: 2, ccypair:"AUDUSD",spot:"spot",oneMonth:"3%",threeMonth:"2%",fiveMonth:"3%", year:"Dealer"
    },
    {
      id: 2, ccypair:"EURUSD",spot:"1M-3M",oneMonth:"3%",threeMonth:"2%",fiveMonth:"3%", year:"Dealer"
    },
    {    
      id: 2, ccypair:"GBPUSD",spot:"3M-5M",oneMonth:"3%",threeMonth:"2%",fiveMonth:"3%", year:"Dealer"
    },
    {
      id: 2, ccypair:"JPYUSD",spot:"5M-1Y",oneMonth:"3%",threeMonth:"2%",fiveMonth:"3%", year:"Dealer"
    },
    {    
      id: 2, ccypair:"ZARUSD",spot:"1Y+",oneMonth:"3%",threeMonth:"2%",fiveMonth:"3%", year:"Dealer"
    }
  ]


  constructor(public dialog: MatDialog) {
    console.log("sales tier called...");
  }

  ngOnInit() {
  }

  openDeleteConfirmationDialog(){
    const dialogRef = this.dialog.open(SalesTierDeleteConfirmationDialogComponent, {
      width: '300px',
      height:'350px',
    })
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }




}
