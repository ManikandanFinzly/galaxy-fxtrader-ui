import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteComfirmationDialogComponent } from '../delete-comfirmation-dialog/delete-comfirmation-dialog.component';
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

  openDeleteConfirmationDialog(index: number) {
    const dialogRef = this.dialog.open(DeleteComfirmationDialogComponent, {
      width: '300px',
      height: '350px',
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
