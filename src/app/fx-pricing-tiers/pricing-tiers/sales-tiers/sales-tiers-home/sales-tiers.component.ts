import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddEditSalesTierComponent } from '../add-edit-sales-tier/add-edit-sales-tier.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'app/globalModules-components/confirmation-dialog/confirmation-dialog.component';
import { AuditHistoryComponent } from '@npmswapstech/audit-history';
import { SalesTiersService } from '../sales-tiers.service';

@Component({
  selector: 'app-sales-tiers',
  templateUrl: './sales-tiers.component.html',
  styleUrls: ['./sales-tiers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SalesTiersComponent implements OnInit {

  isEnabled: boolean;
  isSubTier: boolean;
  isSelectedTier: boolean;

  salesTierNamesData: any;
  constructor(public dialog: MatDialog, private toastr: ToastrService, private salesTierService: SalesTiersService) {
    console.log("sales tier called...");
  }

  ngOnInit() {
    this.getAllSalesTier()
    // this.onSelectTier(this.salesTier[0].tierName);
  }

  getAllSalesTier() {
    this.salesTierService.getAllSalesTier(true).subscribe((response: any) => {
      console.log("AllSalesTierDataNames: ", response);
      if(response.data.length>0){
        this.salesTierNamesData = response.data;
        this.onSelectTier(response.data[0].name);
      }
    })
  }

  getRowHeight() {
    const height = 50;
    return height;
  }

  selectedTier: any = null;
  tableData: any[] = [];

  columnData: any;

  onSelectTier(tierName: string) {
    this.isSelectedTier = true;
    this.salesTierService.getSalesTierByName(tierName).subscribe((response: any) => {
      this.selectedTier = response.data;
      console.log("this.selectedTier: ", this.selectedTier);
      this.isEnabled = this.selectedTier.isEnabled;
      if (!this.selectedTier.isEnabled) {
        this.toastr.error(tierName + " is disabled");
      }
      if (this.selectedTier) {
        this.tableData = this.selectedTier.pricingItem.map(group => {
          const columns = Array.from(new Set(group.tenors.map(tr => `${tr.rangeFrom}-${tr.rangeTo}`)));
          const rows = [];
          if (group.pricingCcySet) {
            group.pricingCcySet.forEach(currencyPair => {
              const row: any = { ccypairs: currencyPair };
              if (group.tenors) {
                group.tenors.forEach(tr => {
                  row[`${tr.rangeFrom}-${tr.rangeTo}`] = tr.pricingAmount.tierName;
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
    })


  }

  addCCYGroup() {
    const dialogRef = this.dialog.open(AddEditSalesTierComponent, {
      width: '500px',
      height: '90vh', panelClass: 'custom-dialog-container',
      data: {
        isDefaultSalesTier: false,
        tierId: '1a2b3c4d-1234-5678-90ab-cdef12345678',
        tierName: 'Silver'
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
    if (ccyGroupName == 'Default') {
      data = {
        isDefaultSalesTier: true,
        tierId: '1a2b3c4d-1234-5678-90ab-cdef12345678',
        tierName: 'Silver',
        pricingItem: {}
      }

    }
    else {
      data = {
        isDefaultSalesTier: false,
        tierId: '1a2b3c4d-1234-5678-90ab-cdef12345678',
        tierName: 'Silver',
        pricingItem: {}
      }
    }
    const dialogRef = this.dialog.open(AddEditSalesTierComponent, {
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
    // const particularRecord = this.salesTier[index];
    // const action = particularRecord.isEnabled? 'disable' : 'enable';
    // this.openConfirmationDialog(action, index);
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
    reqdata['displayName'] = "Sales Tier";
    if (this.isSubTier) {
      reqdata['displayName'] = "Sales Sub Tier";
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

  onAudit(id) {
    this.dialog.open(AuditHistoryComponent, {
      width: '900px',
      height: '500px',
      data: { "url": "/fxtrader/service/audit/PricingTier/" + id }
    });
  }
}




