import {Injectable} from '@angular/core';
import {CalendarEvent} from 'angular-calendar';

export const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
};

declare var gapi: any;

export interface GoogleEvent {
  id; summary; start; end; htmlLink; status;
}

@Injectable()
export class CalendarApplicationService {
  private events: CalendarEvent[] = [];
  static clientID = '37169070793-3eec0n9hc1b6s8tca1njrc64v6jpejvs.apps.googleusercontent.com';
  static scope = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.readonly',
  ];
  constructor() {}

  login(immediate: Boolean = true, callback:(response: any) => void) {
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
          // TODO: save to database
        }
        gapi.client.load('calendar', 'v3', () => {
          console.log('successufly loaded calendar');
          this.loadEvents(callback);
        });
        if (authResult && !authResult.error) {
          console.log('successfully auth');
        } else {
          console.log('error while auth');
        }
      });
    });
  }

  getClient() {
    return gapi.client;
  }

  parseEvents(googleEvents: GoogleEvent[]) {
    const events: CalendarEvent[] = [];
    for (let i = 0; i < googleEvents.length; i++) {
      if (googleEvents[i].status !== 'cancelled') {
        const event: CalendarEvent = {
          id: googleEvents[i].id,
          title: googleEvents[i].summary,
          color: colors.blue,
          start: null,
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

  loadEvents(callback) {
    const _that = this;
    const minDate = new Date();
    minDate.setMonth(minDate.getMonth() - 1); //TODO: customize

    gapi.client.calendar.events.list({
      'calendarId': 'primary', 'timeMin': minDate.toJSON(),
    }).then(callback);
  }

  getEvents(): CalendarEvent[] {
    return this.events;
  }
}
