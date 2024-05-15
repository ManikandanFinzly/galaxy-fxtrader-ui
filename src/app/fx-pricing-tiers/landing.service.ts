import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppURLConstants } from "./URL-Constants";
import { Observable } from 'rxjs';


@Injectable()
export class LandingService{

  preferences: any;
  userName: any;

    constructor(private http: HttpClient) { }
    
    getActivities(searchmodel, page, size){
        return this.http.post(AppURLConstants.searchActivities(page,size), searchmodel);
    }

   

    downloadActivities(searchmodel){
        const httpOptions = {
            responseType: 'blob' as 'json'
          };
        return this.http.post(AppURLConstants.downloadActivities, searchmodel, httpOptions);
    }

    getPreferences() {

        return this.http.get(AppURLConstants.adminURL +"/user-preferences");
      }

    setPreferences(preferences){
        this.preferences= preferences;
      }
      getPreference(){
        return this.preferences;
      }

      setUserName(userName){
        this.userName =userName;
      }
      getUserName(){
        return this.userName
      }

      getUserActivity(type,action,start,end,userTimeZone,userId,page,size){
        return this.http.get(AppURLConstants.searchUserActivities(type,action,start,end,userTimeZone,userId,page,size));
      }


     
      
}