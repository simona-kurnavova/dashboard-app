import {Component, Input, OnInit} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {CalendarEvent} from 'angular-calendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import {CalendarApplicationService, GoogleEvent} from './calendar-application.service';

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
  activeDayIsOpen: boolean = true;
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
    minDate.setMonth(minDate.getMonth() - 1); //TODO: customize

    this.calendarService.getClient().calendar.events.list({
      'calendarId': 'primary', 'timeMin': minDate.toJSON(),
    }).then(function(response) {
      _that.googleEvents = <GoogleEvent[]> response.result.items;
      _that.events = _that.calendarService.parseEvents(_that.googleEvents);
      console.log(_that.googleEvents);
      console.log(_that.events);
    });
  }
}
MAPPINGS['calendar-application'] = CalendarApplicationComponent;


