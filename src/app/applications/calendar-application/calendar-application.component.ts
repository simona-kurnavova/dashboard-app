import {Component, Input, OnInit} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {CalendarEvent} from 'angular-calendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import {CalendarApplicationService, GoogleEvent} from './calendar-application.service';
import {CalendarAddAccountComponent} from './calendar-add-account.component';
import {ApplicationBaseComponent} from '../application-base.component';
import { AlertInterface, EVENT_ADD_ERROR_ALERT, EVENT_ADDED_ALERT, EVENT_EDIT_ERROR_ALERT,
  EVENT_EDITED_ALERT} from '../../authentication-alerts';
import {WidgetService} from '../../services/widget.service';

@Component({
  selector: 'calendar-application',
  templateUrl: './calendar-application.component.html',
  providers: [CalendarApplicationService]
})

export class CalendarApplicationComponent extends ApplicationBaseComponent implements OnInit {
  @Input() modal: Boolean;
  public noAccount: Boolean = false;
  public view: String = 'month';
  public clickedDate: Date;
  public viewDate: Date = new Date();
  public currentEvents: CalendarEvent[] = [];
  public events: CalendarEvent[] = [];
  public activeDayIsOpen: Boolean = true;
  public alerts: Array<AlertInterface> = [];

  public new_event: CalendarEvent = {
    title: null, start: null, end: null
  };

  public edit_event: CalendarEvent = {
    title: null, start: null, end: null
  };

  public selectedMoments = [
    new Date(), new Date()
  ];

  public selectedEditedMoments = [
    new Date(), new Date()
  ];

  constructor(private calendarService: CalendarApplicationService,
              public  popupService: NgbModal,
              private widgetService: WidgetService) {
    super();
  }

  ngOnInit() {
    this.loadEvents();
    if (!this.widget.account) {
      this.noAccount = true;
    }
  }

  isState(state: String) {
    return state === this.state && !this.noAccount;
  }

  setState(state: String) {
    this.state = state;
  }

  loadEvents() {
    const _that = this;
    const callback = (response: any): void => {
      console.log(response);
      const googleEvents = <GoogleEvent[]> response.result.items;
      _that.events = _that.calendarService.parseEvents(googleEvents);
      console.log(_that.events);
    };
    this.calendarService.login(true, callback);
  }

  getEvents() {
    this.loadEvents();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.viewDate = date;
    this.currentEvents = events;
  }

  addAccount() {
    const _that = this;
    const popup = this.popupService.open(CalendarAddAccountComponent, {size: 'lg'});
    popup.componentInstance.widget = this.widget;
    popup.componentInstance.addAccountCallback = (data) => {
      _that.noAccount = false;
      _that.widget.account = data['id'];
      this.widgetService.edit(_that.widget.id, _that.widget).subscribe(
        data => console.log(data),
        err => console.log(err)
      );
    };
  }

  scrollable() {
    if (!this.modal) {
      return 'pre-scrollable calendar-scroll';
    }
  }

  saveEditEvent() {
    const _that = this;
    const callback = (response: any): void => {
      if (response.status === 200) {
        this.alerts.push(EVENT_EDITED_ALERT);
      } else {
        this.alerts.push(EVENT_EDIT_ERROR_ALERT);
      }
      _that.loadEvents();
    };

    this.edit_event.start = this.selectedEditedMoments[0];
    this.edit_event.end = this.selectedEditedMoments[1];
    console.log(this.edit_event);
    this.calendarService.editEvent(this.edit_event, callback);
  }

  editEvent(index) {
    this.edit_event = this.currentEvents[index];
    this.selectedEditedMoments[0] = this.edit_event.start;
    this.selectedEditedMoments[1] = this.edit_event.end;
    this.view = 'edit';
  }

  removeEvent(index) {
    const _that = this;
    const callback = (response: any): void => {
      _that.currentEvents.splice(index, 1);
      _that.loadEvents();
    };
    this.calendarService.removeEvent(this.currentEvents[index], callback);
  }

  createEvent() {
    this.alerts = [];
    const _that = this;

    const callback = (response: any): void => {
      console.log(response);
      if (response.status === 200) {
        _that.alerts.push(EVENT_ADDED_ALERT);
      } else {
        _that.alerts.push(EVENT_ADD_ERROR_ALERT);
      }
      _that.loadEvents();
    };
    this.new_event.start = this.selectedMoments[0];
    this.new_event.end = this.selectedMoments[1];
    this.calendarService.createEvent(this.new_event, callback);
  }
}
MAPPINGS['calendar-application'] = CalendarApplicationComponent;

