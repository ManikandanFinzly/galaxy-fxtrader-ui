import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userInfo = new UserInfo(); // holds current user info
  public userId: string;            // current user id
  public isAuthenticated: boolean;  // authentication flag
  public entitlements = [];         //  entitlements for current user
  username: any;

  constructor(private http: HttpClient, private readonly oauthService: OAuthService) {

  }

  retrieveEntitlements() {
    let authoroties = this.http.get(this.getAuthoritiesUrl());
    authoroties.subscribe((data: any) => {
      if (data) {
        this.entitlements = data;
      } else {
        window.top.location.href = '/portal';
      }
    })
  }

  private getAuthoritiesUrl() {
    return "/activity/authorities";
  }
  /*
    hasEntitlement() => verify the given entitlement with user's entitlement
  */
  hasEntitlement(entitlement) {
    if (this.entitlements.length != 0 && this.entitlements.includes(entitlement)) {
      return true;
    }
    return false;
  }

  async authorizeUser() {

    const sessionUserInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    if (sessionUserInfo) {

      this.userId = sessionUserInfo.username;
      this.isAuthenticated = true;
      localStorage.setItem("userId", this.userId);
    } else {
      let userInfo = this.http.get(this.getUserInfoURL());
      userInfo.subscribe((data: any) => {
        if (data) {
          this.username = data.loginId;
          sessionStorage.userInfo = JSON.stringify(data);
        } else {
          //window.top.location.href = '/portal';
        }
      }, error => {
        // window.top.location.href = '/portal';
      });
    }
  }

  retrieveEntitlementsFromToken() {
    const token: string = this.oauthService.getAccessToken();
    const parsedToken = this.parseJwtToken(token);
    console.log("Entitlements: ", parsedToken.resource_access[environment.appCode]);
    if (parsedToken && parsedToken.resource_access[environment.appCode]) {
      this.entitlements = parsedToken.resource_access[environment.appCode].roles;
    }
  }
  
  parseJwtToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  public getUserInfoURL() {
    return "/activity/user-info";
  }


}


export class UserInfo {
  loginId: string;
}
export class UserAuthorities {
  entitlements = [];
}
export class Entitlement {
  entitlement: string;
  description: string;
}



