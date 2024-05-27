import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddEditTradingTiersComponent } from '../add-edit-trading-tiers/add-edit-trading-tiers.component';
import { ConfirmationDialogComponent } from 'app/globalModules-components/confirmation-dialog/confirmation-dialog.component';
import { TradingTiersService } from '../trading-tiers.service';
import { AuditHistoryComponent } from '@npmswapstech/audit-history';


@Component({
  selector: 'app-trading-tiers',
  templateUrl: './trading-tiers.component.html',
  styleUrls: ['./trading-tiers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TradingTiersComponent implements OnInit {
  isEnabled: boolean;
  isSubTier: boolean;
  constructor(public dialog: MatDialog, private toastr: ToastrService) {
    console.log("Trading tier called...");
  }

  ngOnInit() {
    this.onSelectTier(this.tradingTier[0].tierName);
  }

  getRowHeight() {
    const height = 50;
    return height;
  }

  tradingTier = [
    {
      tierName: 'Platinum',
      isEnabled: true,
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
      isEnabled: false,
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
      isEnabled: false,
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
      isEnabled: false,
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
      isEnabled: false,
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
      isEnabled: false,
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
      isEnabled: false,
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
      isEnabled: false,
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
    this.selectedTier = this.tradingTier.find(tier => tier.tierName === tierName);
    this.isEnabled = this.selectedTier.isEnabled;
    if (!this.selectedTier.isEnabled) {
      this.toastr.error(tierName + " is disabled");
    }
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
      }, console.log(this.tableData));
    } else {
      this.tableData = [];
    }
  }

  addCCYGroup() {
    const dialogRef = this.dialog.open(AddEditTradingTiersComponent, {
      width: '500px',
      height: '90vh', panelClass: 'custom-dialog-container',
      data: {
        isDefaultTrading: false,
        tradingTierId: '1a2b3c4d-1234-5678-90ab-cdef12345678',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toastr.success("Saved Successfully")
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  editTier(ccyGroupName) {
    let data: any;
    if (ccyGroupName == 'default') {
      data = {
        isDefaultTradingTier: true,
        tradingTierId: '1a2b3c4d-1234-5678-90ab-cdef12345678',
        ccyGroupId: 'abcd1234-5678-90ab-cdef-9876543210ac'
      }

    }
    else {
      data = {
        isDefaultTradingTier: false,
        tradingTierId: '1a2b3c4d-1234-5678-90ab-cdef12345678',
        ccyGroupId: 'abcd1234-5678-90ab-cdef-9876543210ab'
      }
    }
    const dialogRef = this.dialog.open(AddEditTradingTiersComponent, {
      width: '500px',
      height: '90vh', panelClass: 'custom-dialog-container',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toastr.success("Saved Successfully")
      }
      console.log(`Dialog result: ${result}`);
    });
  }
  rows;

  openEnableDisableAmountTier(index: number) {
    console.log("Index: ", index);
    const particularRecord = this.tradingTier[index];
    const action = particularRecord.isEnabled ? 'disable' : 'enable';
    this.openConfirmationDialog(action, index);
  }

  openCopyConfirmationDialog(index: number) {
    this.openConfirmationDialog('copy', index);
  }

  openDeleteConfirmationDialog(index: number, isSubTier: boolean) {
    this.isSubTier = isSubTier;
    console.log("isSubTier: ", isSubTier);
    this.openConfirmationDialog('delete', index);
  }

  openConfirmationDialog(action: string, index: number) {
    const reqdata = [];
    reqdata['action'] = action;
    reqdata['displayName'] = "Trading Tier";
    if (this.isSubTier) {
      reqdata['displayName'] = "Trading Sub Tier";
    }
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
          this.rows[index].isEnabled = 1;
        } else if (result.action === 'disable') {
          this.rows[index].isEnabled = 0;
        }
        console.log(`Dialog result: ${result}`);
      }
    });
  }

  onAudit(id){
    this.dialog.open(AuditHistoryComponent, {
    width: '900px',
    height:'500px',
    data: {"url": "/fxtrader/service/audit/PricingTier/"+id}
  });
  }
}
