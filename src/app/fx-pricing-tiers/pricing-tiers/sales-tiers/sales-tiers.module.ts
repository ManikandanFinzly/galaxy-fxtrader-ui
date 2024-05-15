import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './sales-tiers.routing';
import { SalesTiersComponent } from './sales-tiers-home/sales-tiers.component';
import { GlobalControlModuleModule } from 'app/globalModules-components/global-control-module.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    GlobalControlModuleModule
  ],
  declarations: []
})
export class SalesTiersModule { }
