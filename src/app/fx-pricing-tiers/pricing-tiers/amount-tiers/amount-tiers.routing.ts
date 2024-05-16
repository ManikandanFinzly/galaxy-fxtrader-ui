import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AmountTiersComponent } from './amount-tiers-home/amount-tiers.component';
import { ConfigureAmountTierComponent } from './configure-amount-tier/configure-amount-tier.component';

export const routes = [
  { path: '', redirectTo: 'new', pathMatch: 'full' },
  { path: 'new', component: AmountTiersComponent },
  { path: 'configureAmountTier', component: ConfigureAmountTierComponent },
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);