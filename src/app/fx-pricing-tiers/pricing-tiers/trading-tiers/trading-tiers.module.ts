import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './trading-tiers.routing';
import { GlobalControlModuleModule } from 'app/globalModules-components/global-control-module.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    GlobalControlModuleModule
  ],
  declarations: [],
})
export class TradingTiersModule { }   
