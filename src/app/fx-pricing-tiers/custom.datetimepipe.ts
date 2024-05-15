import { Inject, LOCALE_ID, PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";
import * as moment from "moment-timezone";
import "moment-timezone";
import { LandingService } from "./landing.service";

export class CustomDateTimePipe extends DatePipe implements PipeTransform {
  public preferences;
  public dateformat: string;
  public timeZone: string;
  public userLang: string;
  public userName: string;
  constructor(
    @Inject(LOCALE_ID) locale: string,
    public landingService: LandingService
  ) {
    super(locale);
    this.userLang = navigator.language;
    this.setdata();
  }

  transform(value: any, args?: any): any {
    value = value.replace("T", " ");
    value = value + " UTC";
    value = new Date(value);
    if (this.dateformat != null && this.timeZone != null) {
      try {
        return moment.tz(value, this.timeZone).format(this.dateformat);
      } catch (error) {
        console.error("Error while date format",error);
      }
    } else {
      this.dateformat = "MM-DD-YYYY hh:mm:ss.SSS A z";
      this.timeZone = "America/New_York";
      return moment.tz(value, this.timeZone).format(this.dateformat);
    }
  }

  setdata() {
    this.preferences = this.landingService.getPreference();
    if (this.preferences) {
      this.timeZone = this.preferences.timezone;
      this.dateformat = this.preferences.dateFormat;
      this.setDateFormat(this.dateformat);
    } else {
      this.landingService.getPreferences().subscribe((data: any) => {
        this.landingService.setPreferences(data);
        this.timeZone = data.timezone;
        this.dateformat = data.dateFormat;
        this.setDateFormat(this.dateformat);
      });
    }
  }

  setDateFormat(dateFormat: string) {
    if (dateFormat) {
      this.dateformat = dateFormat.toUpperCase() + " hh:mm:ss.SSS A z";
    }
  }
}
