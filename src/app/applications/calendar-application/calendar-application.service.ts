import {Injectable, OnInit} from '@angular/core';
declare var gapi: any;
@Injectable()
export class CalendarApplicationService {
  static client_id = 'https://calendar.google.com/calendar/ical/simasya.k%40gmail.com/private-56a76f0808c528d1297e2fdaecc2946f/basic.ics';
  static apiKey = 'AIzaSyAOR3UpcM2-6VxHylLX_gF1LtGjnT7W404';
  static clientID = '37169070793-3eec0n9hc1b6s8tca1njrc64v6jpejvs.apps.googleusercontent.com';
  static clientSecret = 'BXGbm9MxB40nTgnG1XIBbdxn';
  static scope = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.readonly',
  ];
  isLogged: Boolean = false;

  constructor() {}

  logIn() {
    gapi.load('client', () => {
      console.log('gapi initialized');
      gapi.auth.authorize({
        api_key: CalendarApplicationService.apiKey,
        client_id: CalendarApplicationService.clientID,
        client_secret: CalendarApplicationService.clientSecret,
        scope: CalendarApplicationService.scope,
        ss_domain: 'http://localhost:4200',
        immediate: false
      }, authResult => {
        console.log(authResult);
        if (authResult['access_token']) {
          this.isLogged = true;
        }
        if (authResult && !authResult.error) {
          console.log('successfully auth');
          this.isLogged = true;
        } else {
          console.log('error while auth');
        }
      });
    });
  }

  getList() {
    gapi.client.calendar.events.list({'calendarId': 'primary', 'orderBy': 'startTime' }, result => {
      console.log(result);
    });
  }

  isUserLogged() {
    return this.isLogged;
  }
}
