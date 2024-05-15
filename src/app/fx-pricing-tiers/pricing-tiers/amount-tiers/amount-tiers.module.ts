import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './amount-tiers.routing';
import { AmountTiersComponent } from './amount-tiers-home/amount-tiers.component';
import { GlobalControlModuleModule } from 'app/globalModules-components/global-control-module.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    GlobalControlModuleModule
  ],
  declarations: []
})
export class AmountTiersModule { }
