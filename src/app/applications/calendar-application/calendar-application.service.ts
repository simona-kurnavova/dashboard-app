import {Injectable} from '@angular/core';
declare var gapi: any;

export interface GoogleEvent {
  id: Number;
  summary: String;
  start;
  end;
  htmlLink: String;
}

@Injectable()
export class CalendarApplicationService {
  static clientID = '37169070793-3eec0n9hc1b6s8tca1njrc64v6jpejvs.apps.googleusercontent.com';
  static scope = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.readonly',
  ];
  constructor() {}

  login(immediate: Boolean = true) {
    gapi.load('client', () => {
      gapi.auth.authorize({
        client_id: CalendarApplicationService.clientID,
        scope: CalendarApplicationService.scope,
        immediate: immediate
      }, authResult => {
        console.log(authResult);
        if (authResult['access_token']) {
          localStorage.setItem('calendar_token', authResult['access_token']);
          // TODO: save access token to db
        }
        gapi.client.load('calendar', 'v3', () => {
          console.log('successufly loaded calendar');
        });
        if (authResult && !authResult.error) {
          console.log('successfully auth');
        } else {
          console.log('error while auth');
        }
      });
    });
  }

  getList(list: GoogleEvent[]) {
  }
  getClient() {
    return gapi.client;
  }

  isUserLogged() {
    return !!localStorage.getItem('calendar_token');
  }
}
