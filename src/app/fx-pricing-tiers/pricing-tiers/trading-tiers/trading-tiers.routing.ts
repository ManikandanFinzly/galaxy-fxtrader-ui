import { Routes, RouterModule } from '@angular/router';
import { Component, ModuleWithProviders } from '@angular/core';
import { TradingTiersComponent } from './trading-tiers-home/trading-tiers.component';
import { AddEditTradingTiersComponent } from './add-edit-trading-tiers/add-edit-trading-tiers.component';

export const routes = [
  { path: '', redirectTo: 'new', pathMatch: 'full' },
  { path: 'new', component: TradingTiersComponent },
  { path: 'add', component: AddEditTradingTiersComponent }
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);