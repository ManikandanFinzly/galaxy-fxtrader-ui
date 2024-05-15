import { Component, ViewEncapsulation } from '@angular/core';
import { AppSettings } from './shared/app.settings';
import { Settings } from './shared/app.settings.model';
import { AuthService } from './auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'activity',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public settings: Settings;
    constructor(public appSettings:AppSettings, private authService: AuthService,public router: Router){
      this.settings = this.appSettings.settings;  
  //    authService.authorizeUser();
         this.authorizeUser;
         this.authService.retrieveEntitlementsFromToken();
            //Redirect application after reload
      if (sessionStorage.getItem("reloadURL")) {
        let url = sessionStorage.getItem("reloadURL");
        sessionStorage.removeItem("reloadURL");
        this.router.navigate([url]);
      }
      else {
        this.router.navigate(['']);
      }
    }
    async authorizeUser(){
          // await this.authTokenService.refreshToken().subscribe();
          await this.authService.authorizeUser();
        }
}

