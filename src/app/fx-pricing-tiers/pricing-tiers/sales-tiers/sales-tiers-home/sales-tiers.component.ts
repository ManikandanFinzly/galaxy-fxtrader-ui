import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SalesTierDeleteConfirmationDialogComponent } from '../sales-tier-delete-confirmation-dialog/sales-tier-delete-confirmation-dialog.component';
import { AddEditSalesTierComponent } from '../add-edit-sales-tier/add-edit-sales-tier.component';

@Component({
  selector: 'app-sales-tiers',
  templateUrl: './sales-tiers.component.html',
  styleUrls: ['./sales-tiers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SalesTiersComponent implements OnInit {

  

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

  salesTier = [
    {
      tierName: 'Platinum',
      ccyGroup: [
        {
          ccypairs: ["default"],
          tenorRange: [
            { from: 'ON', to: 'TN', price: 'Flat 2%' },
            { from: '1M', to: '3M', price: 'Flat 3%' },
            { from: '5M', to: '1Y', price: 'Flat 3%' }
          ],
          defaultPrice: 'Flat 1%'
        },
        {
          ccypairs: ["AUDUSD", "EURUSD", "GBPUSD"],
          tenorRange: [
            { from: 'ON', to: 'TN', price: 'Flat 2%' },
            { from: '1M', to: '2M', price: 'Flat 3%' },
            { from: '2M', to: '3M', price: 'Flat 3%' },
            { from: '3M', to: '4M', price: 'Flat 2%' },
            { from: '4M', to: '5M', price: 'Flat 3%' },
            { from: '5M', to: '1Y', price: 'Flat 3%' }
          ],
          defaultPrice: 'Flat 1%',
          applicableChannel: ['Online', 'Channel1']
        },
        {
          ccypairs: ["JPYUSD", "ZARUSD", "QARUSD"],
          tenorRange: [
            { from: '1M', to: '2M', price: 'Flat 2%' },
            { from: '2M', to: '5M', price: 'Flat 3%' }
          ],
          defaultPrice: 'Flat 1%',
          applicableChannel: ['Online', 'Channel1']
        }
      ],
    },
    {
      tierName: 'Gold',
      ccyGroup: [
        {
          ccypairs: ["default"],
          tenorRange: [
            { from: 'ON', to: 'TN', price: 'Flat 2%' },
            { from: '1M', to: '3M', price: 'Flat 3%' },
            { from: '5M', to: '1Y', price: 'Flat 3%' }
          ],
          defaultPrice: 'Flat 1%'
        },
        {
          ccypairs: ["AUDUSD", "EURUSD", "GBPUSD"],
          tenorRange: [
            { from: 'ON', to: 'TN', price: 'Flat 2%' },
            { from: '1M', to: '3M', price: 'Flat 3%' },
            { from: '5M', to: '7M', price: 'Flat 3%' },
            { from: '7M', to: '1Y', price: 'Flat 3%' }
          ],
          defaultPrice: 'Flat 1%',
          applicableChannel: ['Online', 'Channel1']
        },
        {
          ccypairs: ["JJJUSD", "ZARUSD", "QARUSD"],
          tenorRange: [
            { from: '1M', to: '2M', price: 'Flat 2%' },
            { from: '2M', to: '5M', price: 'Flat 3%' }
          ],
          defaultPrice: 'Flat 1%',
          applicableChannel: ['Online', 'Channel1']
        }
      ],
    }
  ];

  selectedTier: any = null;
  tableData: any[] = [];

  onSelectTier(tierName: string) {
    this.selectedTier = this.salesTier.find(tier => tier.tierName === tierName);
    if (this.selectedTier) {
      this.tableData = this.selectedTier.ccyGroup.map(group => {
        const columns = Array.from(new Set(group.tenorRange.map(tr => `${tr.from}-${tr.to}`)));
        const row: any = { ccypairs: group.ccypairs.join(', ') };
        group.tenorRange.forEach(tr => {
          row[`${tr.from}-${tr.to}`] = tr.price;
        });
        return { columns, row };
      });
    } else {
      this.tableData = [];
    }
  }

  addCCYGroup(){
    const dialogRef = this.dialog.open(AddEditSalesTierComponent,{width: '500px',
      height: '90vh', panelClass: 'custom-dialog-container',
      data: {
        isDefaultSalesTier: false,
        salesTierId: '1a2b3c4d-1234-5678-90ab-cdef12345678',
      }});
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      }); 
  }

  editTier(ccyGroupName){    
    let data:any;
    if(ccyGroupName == 'default'){
      data = {
        isDefaultSalesTier: true,
        salesTierId: '1a2b3c4d-1234-5678-90ab-cdef12345678',
        ccyGroupId: 'abcd1234-5678-90ab-cdef-9876543210ac'
      }
      
    }
    else{
      data = {
        isDefaultSalesTier: false,
        salesTierId: '1a2b3c4d-1234-5678-90ab-cdef12345678',
        ccyGroupId: 'abcd1234-5678-90ab-cdef-9876543210ab'
      }
    }
    const dialogRef = this.dialog.open(AddEditSalesTierComponent,{width: '500px',
    height: '90vh', panelClass: 'custom-dialog-container',
    data : data});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    }); 
  }
}




