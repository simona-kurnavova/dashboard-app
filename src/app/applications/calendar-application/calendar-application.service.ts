import {Injectable} from '@angular/core';
import {CalendarEvent} from 'angular-calendar';
import {colors} from './calendar-application.component';

declare var gapi: any;

export interface GoogleEvent {
  id;
  summary;
  start;
  end;
  htmlLink;
  status;
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
    console.log('trying login');
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

  parseEvents(googleEvents: GoogleEvent[]) {
    let events: CalendarEvent[] = [];
    for (let i = 0; i < googleEvents.length; i++) {
      if (googleEvents[i].status !== 'cancelled') {
        const event: CalendarEvent = {
          id: googleEvents[i].id,
          title: googleEvents[i].summary,
          color: colors.blue,
        };
        if (googleEvents[i].start.dateTime) {
          event.start = new Date(googleEvents[i].start.dateTime);
          event.end = new Date(googleEvents[i].end.dateTime);
        } else {
          event.start = new Date(googleEvents[i].start.date);
          event.end = new Date(googleEvents[i].end.date);
          event.allDay = true;
        }
        events.push(event);
      }
    }
    return events;
  }
}
