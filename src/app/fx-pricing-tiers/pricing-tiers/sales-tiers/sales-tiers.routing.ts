import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SalesTiersComponent } from './sales-tiers-home/sales-tiers.component';

export const routes = [
  { path: '', redirectTo: 'new', pathMatch: 'full' },
  { path: 'new', component: SalesTiersComponent },
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);