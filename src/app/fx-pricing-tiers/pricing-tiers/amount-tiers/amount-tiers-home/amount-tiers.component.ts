import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../../../globalModules-components/confirmation-dialog/confirmation-dialog.component';
import { AmountTiersService } from '../amount-tiers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-amount-tiers',
  templateUrl: './amount-tiers.component.html',
  styleUrls: ['./amount-tiers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AmountTiersComponent implements OnInit {

  rows
  constructor(public dialog: MatDialog, public amountTiersService: AmountTiersService, private router: Router) {
    this.getAmountTier();
  }

  ngOnInit() {
  }

  getAmountTier() {
    this.amountTiersService.getAmountTier().subscribe(data => {
      if (data) {
        this.rows = data;
      }
    });
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

  openEnableDisableAmountTier(index: number) {
    if (this.rows[index]) {
      const particularRecord = this.rows[index];
      const action = particularRecord.isEnabled === 0 ? 'enable' : 'disable';
      this.openConfirmationDialog(action, index);
    }
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

}
