import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LandingModule } from './fx-pricing-tiers/landing.module';


export const routes: Routes = [
  { path: '', redirectTo: 'trader-service', pathMatch: 'full' },
  { path: 'trader-service', loadChildren: getLandingModule }
];

export function getLandingModule() {
  return LandingModule;
  }

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    useHash: true
});