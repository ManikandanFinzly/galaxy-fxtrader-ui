import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddEditTradingTiersComponent } from '../add-edit-trading-tiers/add-edit-trading-tiers.component';
import { ConfirmationDialogComponent } from 'app/globalModules-components/confirmation-dialog/confirmation-dialog.component';
import { TradingTiersService } from '../trading-tiers.service';


@Component({
  selector: 'app-trading-tiers',
  templateUrl: './trading-tiers.component.html',
  styleUrls: ['./trading-tiers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TradingTiersComponent implements OnInit {
  tradingData
  constructor(public dialog: MatDialog) {
    console.log("Trading tier called...");
  }

  ngOnInit() {
    this.onSelectTier(this.salesTier[0].tierName);
  }

  getRowHeight() {
    const height = 50;
    return height;
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
          ccypairs: [
            "AUDAUD", "AUDMYR", "AUDUSD", "CADCAD", "CHFCHF", "EURCAD", "EUREUR", 
            "EURJPY", "EURUSD", "GBPAUD", "GBPGBP", "GBPUSD", "HKDHKD", "JPYJPY", 
            "MXNMXN", "NZDUSD", "USDAED", "USDAFN", "USDAMD", "USDANG", "USDARS", 
            "USDAWG", "USDAZM", "USDAZN", "USDBAM", "USDBBD", "USDBDT", "USDBGN", 
            "USDBHD", "USDBIF", "USDBMD", "USDBND", "USDBOB", "USDBRL", "USDBSD", 
            "USDBWP", "USDBZD", "USDCAD", "USDCDF", "USDCHF"
        ],
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
        },
        {
          ccypairs: ["AUDUSD", "EURUSD", "GBPUSD", "JJJUSD", "ZARUSD", "QARUSD"],
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
    },
    {
      tierName: 'Silver',
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
          ccypairs: [
            "AUDAUD", "AUDMYR", "AUDUSD", "CADCAD", "CHFCHF", "EURCAD", "EUREUR", 
            "EURJPY", "EURUSD", "GBPAUD", "GBPGBP", "GBPUSD", "HKDHKD", "JPYJPY", 
            "MXNMXN", "NZDUSD", "USDAED", "USDAFN", "USDAMD", "USDANG", "USDARS", 
            "USDAWG", "USDAZM", "USDAZN", "USDBAM", "USDBBD", "USDBDT", "USDBGN", 
            "USDBHD", "USDBIF", "USDBMD", "USDBND", "USDBOB", "USDBRL", "USDBSD", 
            "USDBWP", "USDBZD", "USDCAD", "USDCDF", "USDCHF"
        ],
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
        },
        {
          ccypairs: ["AUDUSD", "EURUSD", "GBPUSD", "JJJUSD", "ZARUSD", "QARUSD"],
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
      tierName: 'Bronze',
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
        }
      ],
    },
    {
      tierName: 'Copper',
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
          ccypairs: [
            "AUDAUD", "AUDMYR", "AUDUSD", "CADCAD", "CHFCHF", "EURCAD", "EUREUR", 
            "EURJPY", "EURUSD", "GBPAUD", "GBPGBP", "GBPUSD", "HKDHKD", "JPYJPY", 
            "MXNMXN", "NZDUSD", "USDAED", "USDAFN", "USDAMD", "USDANG", "USDARS", 
            "USDAWG", "USDAZM", "USDAZN", "USDBAM", "USDBBD", "USDBDT", "USDBGN", 
            "USDBHD", "USDBIF", "USDBMD", "USDBND", "USDBOB", "USDBRL", "USDBSD", 
            "USDBWP", "USDBZD", "USDCAD", "USDCDF", "USDCHF"
        ],
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
        },
        {
          ccypairs: ["AUDUSD", "EURUSD", "GBPUSD", "JJJUSD", "ZARUSD", "QARUSD"],
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
      tierName: 'Uranium',
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
    },
    {
      tierName: 'Radium',
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
          ccypairs: [
            "AUDAUD", "AUDMYR", "AUDUSD", "CADCAD", "CHFCHF", "EURCAD", "EUREUR", 
            "EURJPY", "EURUSD", "GBPAUD", "GBPGBP", "GBPUSD", "HKDHKD", "JPYJPY", 
            "MXNMXN", "NZDUSD", "USDAED", "USDAFN", "USDAMD", "USDANG", "USDARS", 
            "USDAWG", "USDAZM", "USDAZN", "USDBAM", "USDBBD", "USDBDT", "USDBGN", 
            "USDBHD", "USDBIF", "USDBMD", "USDBND", "USDBOB", "USDBRL", "USDBSD", 
            "USDBWP", "USDBZD", "USDCAD", "USDCDF", "USDCHF"
        ],
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
        },
        {
          ccypairs: ["AUDUSD", "EURUSD", "GBPUSD", "JJJUSD", "ZARUSD", "QARUSD"],
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
      tierName: 'Plutonium',
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

  columnData: any;

  onSelectTier(tierName: string) {
  this.selectedTier = this.salesTier.find(tier => tier.tierName === tierName);
  if (this.selectedTier) {
    this.tableData = this.selectedTier.ccyGroup.map(group => {
      const columns = Array.from(new Set(group.tenorRange.map(tr => `${tr.from}-${tr.to}`)));
      const rows = [];
      if (group.ccypairs) {
        group.ccypairs.forEach(currencyPair => {
          const row: any = { ccypairs: currencyPair };
          if (group.tenorRange) {
            group.tenorRange.forEach(tr => {
              row[`${tr.from}-${tr.to}`] = tr.price;
            });
          }
          rows.push(row);
        });
        console.log("Columns, rows: ", columns, rows);
        return { columns, rows };
      }
    },console.log(this.tableData));
    } else {
      this.tableData = [];
    }
  }

  addCCYGroup(){
    const dialogRef = this.dialog.open(AddEditTradingTiersComponent,{width: '500px',
      height: '90vh', panelClass: 'custom-dialog-container',
      data: {
        isDefaultSalesTier: false,
        tradingTierId: '1',
        ccyGroupId: '1'
      }});
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      }); 
  }

  editTier(){  
    console.log("Vanduthan da EDIT ::",this.tradingData[0]); 
    this.tradingData.getCCYPair;
    const dialogRef = this.dialog.open(AddEditTradingTiersComponent,{width: '500px',
    height: '90vh', panelClass: 'custom-dialog-container',
    data : this.tradingData});
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
