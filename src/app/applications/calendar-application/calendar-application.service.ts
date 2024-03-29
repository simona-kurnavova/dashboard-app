import {Injectable} from '@angular/core';
import {CalendarEvent} from 'angular-calendar';
import {AccountInterface} from '../../services/account.service';
import {ApplicationManagerService} from '../../services/application-manager.service';

/**
 * Color definition for Angular Calendar - necessary for proper function
 */
export const colors: any = {
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
};

/**
 * Gapi type definition for suppressing syntax highlight error in WebStorm
 */
declare var gapi: any;

/**
 * Google calendar event type definition for parsing from Google API
 */
export interface GoogleEvent {
  id; summary; start; end; htmlLink; status;
}

@Injectable()
export class CalendarApplicationService {
  /**
   * App client ID registered at Google develop console
   */
  static clientID = '37169070793-3eec0n9hc1b6s8tca1njrc64v6jpejvs.apps.googleusercontent.com';
  /**
   * Scopes for Google events
   */
  static scope = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.readonly',
  ];
  /**
   * ID of calendar accessed by app
   */
  static calendar_id = 'primary';
  /**
   * Account type - also app name in database
   */
  static account_type = 'google';
  /**
   * Account name
   */
  static account_name = 'Google';

  constructor(private appManagerService: ApplicationManagerService) {}

  /**
   * Login into Google account and retrieve events
   */
  login(immediate: Boolean = true, callback: (response: any) => void) {
    gapi.load('client', () => {
      gapi.auth.authorize({
        client_id: CalendarApplicationService.clientID,
        scope: CalendarApplicationService.scope,
        immediate: immediate
      }, authResult => {
        if (authResult['access_token']) {
          localStorage.setItem('calendar_token', authResult['access_token']);
        }
        gapi.client.load('calendar', 'v3', () => {
          this.loadEvents(callback);
        });
      });
    });
  }

  /**
   * Adds Google account - asks user to authenticate via Google form and saves token to database
   */
  addAccount(addAccountCallback, loadGapiCallback) {
    gapi.load('client', () => {
      gapi.auth.authorize({
        client_id: CalendarApplicationService.clientID,
        scope: CalendarApplicationService.scope,
        immediate: false
      }, authResult => {
        if (authResult['access_token']) {
          localStorage.setItem('calendar_token', authResult['access_token']);
          this.saveToken(authResult['access_token'], addAccountCallback); // adds ID of account to DB
        }
        gapi.client.load('calendar', 'v3', loadGapiCallback);
      });
    });
  }

  /**
   * Saves token to database
   */
  saveToken(token, callback) {
    const account: AccountInterface = {
      type: CalendarApplicationService.account_type,
      name: CalendarApplicationService.account_name,
      token: token,
    };
    this.appManagerService.saveAccount(account).subscribe(callback);
  }

  /**
   * Parse events from Google Calendar event objects to Angular calendar event object
   */
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
          event.allDay = true;
        }
        events.push(event);
      }
    }
    return events;
  }

  /**
   * Loads events from primary calendar via Google Calendar API
   */
  loadEvents(callback) {
    const minDate = new Date();
    minDate.setMonth(minDate.getMonth() - 3);

    gapi.client.calendar.events.list({
      'calendarId': CalendarApplicationService.calendar_id,
      'timeMin': minDate.toJSON(),
    }).then(callback);
  }

  /**
   * Removes event via Google Calendar API
   */
  removeEvent(event: CalendarEvent, callback: (response: any) => void) {
    gapi.client.calendar.events.delete({
      'calendarId': CalendarApplicationService.calendar_id,
      'eventId': event.id.toString()
    }).then(callback);
  }

  /**
   * Edits event via Google Calendar API
   */
  editEvent(event: CalendarEvent, callback: (response: any) => void) {
    gapi.client.calendar.events.patch({
      'calendarId': CalendarApplicationService.calendar_id,
      'eventId': event.id.toString(),
      'summary': event.title,
      'start': { dateTime: event.start.toJSON() },
      'end': { dateTime: event.end.toJSON() },
    }).then(callback);
  }

  /**
   * Creates new event in primary Google Calendar
   */
  createEvent(event: CalendarEvent, callback: (response: any) => void) {
    gapi.client.calendar.events.insert({
      'calendarId': CalendarApplicationService.calendar_id,
      'summary': event.title,
      'start': { dateTime: event.start.toJSON() },
      'end': { dateTime: event.end.toJSON() },
    }).then(callback);
  }
}
