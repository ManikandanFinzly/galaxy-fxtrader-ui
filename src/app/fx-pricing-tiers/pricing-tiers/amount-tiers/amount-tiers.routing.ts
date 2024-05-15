import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AmountTiersComponent } from './amount-tiers-home/amount-tiers.component';

export const routes = [
  { path: '', redirectTo: 'new', pathMatch: 'full' },
  { path: 'new', component: AmountTiersComponent },
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);