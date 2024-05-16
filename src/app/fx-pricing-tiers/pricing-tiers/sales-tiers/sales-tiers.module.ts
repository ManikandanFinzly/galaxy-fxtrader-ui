import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './sales-tiers.routing';
import { GlobalControlModuleModule } from 'app/globalModules-components/global-control-module.module';
import { AddEditSalesTierComponent } from './add-edit-sales-tier/add-edit-sales-tier.component';
import { SalesTierDeleteConfirmationDialogComponent } from './sales-tier-delete-confirmation-dialog/sales-tier-delete-confirmation-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    GlobalControlModuleModule
  ],

  declarations: [AddEditSalesTierComponent, SalesTierDeleteConfirmationDialogComponent]

})
export class SalesTiersModule { }
