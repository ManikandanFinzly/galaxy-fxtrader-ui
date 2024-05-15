import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { RateSourceComponent } from './rate-source-home/rate-source.component';

export const routes = [
  { path: '', redirectTo: 'new', pathMatch: 'full' },
  { path: 'new', component: RateSourceComponent },
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);