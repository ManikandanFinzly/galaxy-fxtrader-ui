import { Injectable } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';

@Injectable()
export class AuthConfigService {

  private _decodedAccessToken: any;
  private _decodedIDToken: any;
  sessionInterval: any;
  get decodedAccessToken() { return this._decodedAccessToken; }
  get decodedIDToken() { return this._decodedIDToken; }

  constructor(
    private readonly oauthService: OAuthService,
    private readonly authConfig: AuthConfig,
    // private authTokenService: AuthTokenService
  )  { }

  async initAuth(): Promise<any> {
    return new Promise<void>((resolveFn, rejectFn) => {
      // setup oauthService
      this.oauthService.configure(this.authConfig);
      this.oauthService.setStorage(localStorage);
      this.oauthService.tokenValidationHandler = new NullValidationHandler();
     
      // subscribe to token events
      this.oauthService.events
        .pipe(filter((e: any) => {
          return e.type === 'token_received';
        }))
        .subscribe(() => this.handleNewToken());

      // logout from portal on OAuthErrorEvent
      this.oauthService.events.subscribe(event => {
        console.log("oauthService event type", event.type)
        if (event instanceof OAuthErrorEvent) {
          //this.authTokenService.logout();
        }
      });

      // continue initializing app or redirect to login-page
      this.oauthService.loadDiscoveryDocumentAndLogin().then(isLoggedIn => {
        if (isLoggedIn) {
          this.oauthService.setupAutomaticSilentRefresh();
          this.sessionInterval = setInterval(() => { this.validateMutliTabSession() }, 5000);
          resolveFn();
        } else {
          this.oauthService.initImplicitFlow();
          rejectFn();
        }
      });

    });
  }

  validateMutliTabSession() {
    if (!this.oauthService.hasValidAccessToken()) {
      //clearInterval(this.sessionInterval);
      //this.authTokenService.logout();
    }
  }

  private handleNewToken() {
    this._decodedAccessToken = this.oauthService.getAccessToken();
    this._decodedIDToken = this.oauthService.getIdToken();
  }

}