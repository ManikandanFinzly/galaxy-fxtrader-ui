import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../../../globalModules-components/confirmation-dialog/confirmation-dialog.component';
import { AmountTiersService } from '../amount-tiers.service';
import { Router } from '@angular/router';
import { AuditHistoryComponent } from '@npmswapstech/audit-history';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-amount-tiers',
  templateUrl: './amount-tiers.component.html',
  styleUrls: ['./amount-tiers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AmountTiersComponent implements OnInit {

  rows
  constructor(public dialog: MatDialog, public amountTiersService: AmountTiersService, private router: Router, public apiService: ApiService) {
    this.getAmountTier();
  }

  ngOnInit() {
  }

  getAmountTier() {
    this.apiService.get("/fxtrader/pricingamount").subscribe(
      (reqData) => {
       console.log("DATA ::", reqData.data);
       this.rows = reqData.data;
      },
      (error) => {
        
      }
    );
    // this.amountTiersService.getAmountTier().subscribe(data => {
    //   if (data) {
    //     this.rows = data;
    //   }
    // });
  }

  getStatus(isEnabled: number): string {
    return isEnabled === 1 ? 'Active' : 'Disabled';
  }

  openEditScreen(index: number) {
    if (this.rows[index]) {
      const queryParams = { param1: JSON.stringify(this.rows[index]) };
      this.router.navigate(['/amount-tiers/configureAmountTier'], { queryParams });
    }
  }

  enableDisableAmountTier(index: number) {
    if (this.rows[index]) {
      const particularRecord = this.rows[index];
      const action = particularRecord.isEnabled === 0 ? 'enable' : 'disable';
      this.openConfirmationDialog(action, index);
    }
  }

  openCopyConfirmationDialog(index: number) {
    console.log("rows ::", this.rows[index]);
    this.openConfirmationDialog('copy', this.rows[index]);
  }

  openDeleteConfirmationDialog(index: number) {
    this.openConfirmationDialog('delete', index);
  }

  openConfirmationDialog(action: string, indexData: any) {
    const reqdata = [];
    reqdata['action'] = action;
    reqdata['displayName'] = "Amount Tier";
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
          indexData.tierName = result.formValue.tierName;
          this.apiService.post("/fxtrader/pricingamount", indexData).subscribe(
            (data) => {
              console.log("DATA ::", data);
              window.location.reload();
            },
            (error) => {
  
            }
          );
        
        } else if (result.action === 'enable') {
         // this.rows[index].isEnabled = 1;
        } else if (result.action === 'disable') {
        //  this.rows[index].isEnabled = 0;
        }
        console.log(`Dialog result: ${result}`);
      }
    });
  }

  onAudit(id){
    this.dialog.open(AuditHistoryComponent, {
    width: '900px',
    height:'500px',
    data: {"url": "/fxtrader/service/audit/PricingAmount/"+id}
  });
  }

}
