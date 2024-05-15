import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routing';
import { AppSettings } from './shared/app.settings';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Globals } from '../globals.service';
import { IAppState, CounterActions } from '../store';
import { NgModule, Inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import {NgReduxModule, NgRedux } from '@angular-redux/store';
import { ToastrModule } from 'ngx-toastr';
import { GalaxyMenuModule} from '@npmswapstech/swapstech-galaxy-menu';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxMatDrpModule } from 'ngx-mat-daterange-picker';
import { AuthService } from './auth/auth.service';
import { TokenInterceptor } from './auth/token-interceptor';
import { FormlyAutoCompleteModule,FormlyAutoCompleteComponent } from '@npmswapstech/formly-auto-complete';
import { FormlyModule } from '@ngx-formly/core';
import {FormlyMaterialModule} from '@ngx-formly/material';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthConfigModule } from 'keycloak/auth.config.module';
import { MatBottomSheetModule, MatButtonToggleModule, MatCardModule, MatDialog, MatDialogContent, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatSlideToggleModule } from '@angular/material';
import { LandingModule } from './fx-pricing-tiers/landing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddEditTradingTiersComponent } from './fx-pricing-tiers/pricing-tiers/trading-tiers/add-edit-trading-tiers/add-edit-trading-tiers.component';
import { SalesTiersComponent } from './fx-pricing-tiers/pricing-tiers/sales-tiers/sales-tiers-home/sales-tiers.component';
import { TradingTiersComponent } from './fx-pricing-tiers/pricing-tiers/trading-tiers/trading-tiers-home/trading-tiers.component';
import { RateSourceComponent } from './fx-pricing-tiers/pricing-tiers/rate-source/rate-source-home/rate-source.component';
import { AmountTiersComponent } from './fx-pricing-tiers/pricing-tiers/amount-tiers/amount-tiers-home/amount-tiers.component';
import { HeaderComponent } from './theme/components/header/header.component';
import { GlobalControlModuleModule } from './globalModules-components/global-control-module.module';


@NgModule({
  declarations: [
    AppComponent,
    AddEditTradingTiersComponent,
    SalesTiersComponent,
    TradingTiersComponent,
    RateSourceComponent,
    AmountTiersComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    routing,
    GlobalControlModuleModule,
    HttpClientModule,
    NgReduxModule,
    RouterModule,
    FormsModule,
    LandingModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    NgxSpinnerModule,
    GalaxyMenuModule,
    NgxMatDrpModule,
    NgxDatatableModule,
    FormlyAutoCompleteModule,
    FormlyModule.forRoot({
    types: [
     {
      name: 'auto-complete',   
      component: FormlyAutoCompleteComponent,    
      defaultOptions: {  
      templateOptions: {   
      multiSelectOptions: {},   
      },},},
      ]
    }),
   AuthConfigModule,
    OAuthModule

  ],
  providers: [ AppSettings , {provide: APP_BASE_HREF, useValue: '/'}, CounterActions, Globals, AuthService,
              {  provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptor,
                multi: true
            }],
  bootstrap: [ AppComponent ],
  entryComponents: [AddEditTradingTiersComponent],
})

export class AppModule { 
  constructor(private ngRedux: NgRedux<IAppState>,
    private globals:Globals,
    @Inject('localStoreRef') private localStoreRef: any,
    @Inject('globalEventDispatcherRef') private globalEventDispatcherRef: any) {

this.ngRedux.provideStore(localStoreRef);
this.globals.globalEventDistributor = globalEventDispatcherRef;
}
}
