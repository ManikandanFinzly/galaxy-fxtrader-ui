import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './rate-source.routing';
import { RateSourceComponent } from './rate-source-home/rate-source.component';
import { GlobalControlModuleModule } from 'app/globalModules-components/global-control-module.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    GlobalControlModuleModule
  ],
  declarations: []
})
export class RateSourceModule { }
