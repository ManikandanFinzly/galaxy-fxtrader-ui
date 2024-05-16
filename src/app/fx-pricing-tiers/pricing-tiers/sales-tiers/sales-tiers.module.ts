import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './sales-tiers.routing';
import { SalesTiersComponent } from './sales-tiers-home/sales-tiers.component';
import { GlobalControlModuleModule } from 'app/globalModules-components/global-control-module.module';
import { AddEditSalesTierComponent } from './add-edit-sales-tier/add-edit-sales-tier.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    GlobalControlModuleModule
  ],
  declarations: [AddEditSalesTierComponent]
})
export class SalesTiersModule { }
