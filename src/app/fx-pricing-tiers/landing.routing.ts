import { Routes, RouterModule } from '@angular/router';
import { LandingComponentComponent } from './landing-component/landing-component.component';
import { SalesTiersComponent } from './pricing-tiers/sales-tiers/sales-tiers-home/sales-tiers.component';
import { TradingTiersComponent } from './pricing-tiers/trading-tiers/trading-tiers-home/trading-tiers.component';
import { RateSourceComponent } from './pricing-tiers/rate-source/rate-source-home/rate-source.component';
import { AmountTiersComponent } from './pricing-tiers/amount-tiers/amount-tiers-home/amount-tiers.component';
import { ConfigureAmountTierComponent } from './pricing-tiers/amount-tiers/configure-amount-tier/configure-amount-tier.component';


export const routes: Routes = [
    {
        path: '', 
        component: LandingComponentComponent,
        children:[
            { path:'', redirectTo:'sales-tiers', pathMatch:'full' },
            { path: 'landing', component: LandingComponentComponent },
            { path: 'sales-tiers', component: SalesTiersComponent },
            { path: 'trading-tiers', component: TradingTiersComponent },
            { path: 'rate-source', component: RateSourceComponent },
            { path: 'amount-tiers', component: AmountTiersComponent },
            { path: 'amount-tiers/configureAmountTier', component: ConfigureAmountTierComponent }
       ]
    }
];

export const routing = RouterModule.forRoot(routes);
