import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteComfirmationDialogComponent } from '../delete-comfirmation-dialog/delete-comfirmation-dialog.component';
// import { MatDialog } from '@angular/material/dialog';
// import { DeleteComfirmationDialogComponent } from '../delete-comfirmation-dialog/delete-comfirmation-dialog.component';

@Component({
  selector: 'app-amount-tiers',
  templateUrl: './amount-tiers.component.html',
  styleUrls: ['./amount-tiers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AmountTiersComponent implements OnInit {

  rows=[
    {
      tierName:"mercy",status:"Active",action:"Nairobi"
    },
    {
      tierName:"Vincent",status:"Active",action:"Kampala"
    },
    {    
      tierName:"Wesley",status:"Active",action:"Cairo"
    }
  ]
  constructor(public dialog: MatDialog) {
    console.log("amount tier called...");
  }

  ngOnInit() {
  }


  openDeleteConfirmationDialog(){
    const dialogRef = this.dialog.open(DeleteComfirmationDialogComponent, {
      width: '300px',
      height:'350px',
    })
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }
}
