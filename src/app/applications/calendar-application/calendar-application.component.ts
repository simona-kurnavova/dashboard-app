import {Component, Input, OnInit} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {CalendarEvent} from 'angular-calendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import {CalendarApplicationService, GoogleEvent} from './calendar-application.service';

export const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

const test_events: CalendarEvent[] = [
  {
    title: 'An all day event',
    start: new Date(),
    allDay: true
  },

  {
    title: 'A non all day event',
    start: new Date(),
    end: new Date()
  }
];

@Component({
  selector: 'calendar-application',
  templateUrl: './calendar-application.component.html',
})

export class CalendarApplicationComponent implements OnInit {
  public view: String = 'month';
  public viewDate: Date = new Date();
  public googleEvents: GoogleEvent[] = [];
  public events: CalendarEvent[] = [];
  public clickedDate: Date;
  @Input() state = 'normal';

  constructor(private modal: NgbModal, private calendarService: CalendarApplicationService) {}

  ngOnInit() {
    this.calendarService.login();
  }

  isState(state: String) {
    return state === this.state;
  }

  getEvents() {
    const _that = this;
    const minDate = new Date();
    minDate.setMonth(minDate.getMonth() - 1);

    this.calendarService.getClient().calendar.events.list({
      'calendarId': 'primary',
      'showDeleted': 'false',
      'timeMin': minDate.toJSON(),
    }).then(function(response) {
      _that.googleEvents = <GoogleEvent[]> response.result.items;
      _that.events = _that.calendarService.parseEvents(_that.googleEvents);
      console.log(_that.googleEvents);
      console.log(_that.events);
    });
  }
}
MAPPINGS['calendar-application'] = CalendarApplicationComponent;


