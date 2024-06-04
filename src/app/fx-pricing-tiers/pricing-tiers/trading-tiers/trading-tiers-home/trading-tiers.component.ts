import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddEditTradingTiersComponent } from '../add-edit-trading-tiers/add-edit-trading-tiers.component';
import { ConfirmationDialogComponent } from 'app/globalModules-components/confirmation-dialog/confirmation-dialog.component';
import { TradingTiersService } from '../trading-tiers.service';
import { AuditHistoryComponent } from '@npmswapstech/audit-history';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-trading-tiers',
  templateUrl: './trading-tiers.component.html',
  styleUrls: ['./trading-tiers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TradingTiersComponent implements OnInit {
  tradingTier: any[] = [];
  errorMessage: string = '';

  isEnabled: boolean;
  isSubTier: boolean;
  isSelectedTier: boolean;
  tradingTierNamesData: any;
  selectedTier: any = null;
  tableData: any[] = [];
  columnData: any;

  rows;

  constructor(public dialog: MatDialog, private toastr: ToastrService, private tradingTierService: TradingTiersService, private apiService: ApiService) {
    console.log("Trading tier called...");
  }

  getRowHeight() {
    const height = 50;
    return height;
  }

  ngOnInit(): void {
    this.getAllTradingTier();
  }

  getAllTradingTier() {
    this.tradingTierService.getAllTradingTier(true).subscribe((response: any) => {
      console.log("DATA ::: ", response);
      if (response.data.length > 0) {
        this.tradingTierNamesData = response.data;
        this.onSelectTier(response.data[0].id);
      }
    });
  }

  onSelectTier(tierId: string) {
    this.tradingTierService.getTradingTierById(tierId).subscribe((response: any) => {
      this.isSelectedTier = true;
      this.selectedTier = response.data;
      console.log("this.selectedTier: ", this.selectedTier);
      this.isEnabled = this.selectedTier.isEnabled;
      if (!this.isEnabled) {
        this.toastr.error(this.selectedTier.name + " is disabled");
      }
      if (this.selectedTier && this.selectedTier.pricingItem) {
        this.tableData = this.selectedTier.pricingItem.map(group => {
          const columns = group.tenors ?
            Array.from(new Set(group.tenors.map(tr => `${tr.rangeFrom}-${tr.rangeTo}`))) : [];
          const rows = [];
          if (group.pricingCcySet) {
            group.pricingCcySet.forEach(currencyPair => {
              const row: any = { ccypairs: currencyPair.ccyPair };
              if (group.tenors) {
                group.tenors.forEach(tr => {
                  row[`${tr.rangeFrom}-${tr.rangeTo}`] = tr.pricingAmount.tierName;
                });
              }
              rows.push(row);
            });
            console.log("Columns, rows: ", columns, rows);
            return { columns, rows, groupId: group.id }; 
          }
        });
        console.log(this.tableData);
      } else {
        this.tableData = [];
      }
    });
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
        this.toastr.success("Saved Successfully");
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  openEnableDisableAmountTier(id: string, index: number) {
    this.tradingTierService.getTradingTierById(id).subscribe(
      (response: any) => {
        console.log("Index: ", index);
        const action = response.data.isEnabled ? 'disable' : 'enable';
        this.openConfirmationDialog(response.data.tierType, response.data.id, action, index);
      });
  }

  // openCopyConfirmationDialog(index: number) {
  //   this.openConfirmationDialog('copy', index);
  // }

  // openDeleteConfirmationDialog(index: number, isSubTier: boolean) {
  //   this.isSubTier = isSubTier;
  //   console.log("isSubTier: ", isSubTier, "Index: ", index);
  //   this.openConfirmationDialog('delete', index);
  // }
  
  openConfirmationDialog(tierType:string, tierId:string, action: string, index: number) {
    const reqdata = {
      action: action,
      displayName: this.isSubTier ? "Trading Sub Tier" : "Trading Tier"
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      height: '350px',
      data: { reqdata }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.action === 'delete') {
          console.log("Delete action is called.");
          if (this.isSubTier) {
            const subTierId = this.tableData[index] ? this.tableData[index].groupId : null; 
            if (subTierId) {
              this.deleteSubTier(this.selectedTier.id, subTierId);
            } else {
              console.error("Sub-tier ID not found");
            }
          } else {
            this.deleteTradingTier(this.selectedTier.id);
          }
        } else if (result.action === 'copy' && result.formValue) {
          console.log('Form Value:', result.formValue);
        } else if (result.action === 'enable') {
          // this.tradingTierService.enableTradingTier(tierType,tierId);
          this.toastr.success('Trading Tier Enabled Successfully');
        } else if (result.action === 'disable') {
          // this.tradingTierService.disableTradingTier(tierType,tierId);
          this.toastr.success('Trading Tier disabled Successfully');
        }
        console.log(`Dialog result: ${result}`);
      }
    });
  }

  deleteTradingTier(tierId: string) {
    this.tradingTierService.deleteTradingTier(tierId, '').subscribe(
      (response: any) => {
        this.toastr.success('Deleted Successfully');
        this.getAllTradingTier();
      },
      (error: any) => {
        this.toastr.error('Error deleting tier');
        console.error('Error deleting tier:', error);
      }
    );
  }

  deleteSubTier(tierId: string, subTierId: string) {
    this.tradingTierService.deleteTradingTier(tierId, subTierId).subscribe(
      (response: any) => {
        this.toastr.success('Sub-tier Deleted Successfully');
        this.onSelectTier(tierId); // Refresh the selected tier to update the UI
      },
      (error: any) => {
        this.toastr.error('Error deleting sub-tier');
        console.error('Error deleting sub-tier:', error);
      }
    );
  }

  onAudit(id: string) {
    this.dialog.open(AuditHistoryComponent, {
      width: '900px',
      height: '500px',
      data: { "url": "/fxtrader/service/audit/PricingTier/" + id }
    });
  }
}
