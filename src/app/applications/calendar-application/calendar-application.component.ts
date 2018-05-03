import {Component, Input, OnInit} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {CalendarEvent} from 'angular-calendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import {CalendarApplicationService, GoogleEvent} from './calendar-application.service';
import {CalendarAddAccountComponent} from './calendar-add-account.component';
import {ApplicationBaseComponent} from '../../components/main.components/application-base.component';
import { AlertInterface, EVENT_ADD_ERROR_ALERT, EVENT_ADDED_ALERT, EVENT_EDIT_ERROR_ALERT,
  EVENT_EDITED_ALERT} from '../../alert-definitions';
import {ApplicationManagerService} from '../../services/application-manager.service';

/**
 * Google Calendar application main component
 */
@Component({
  selector: 'calendar-application',
  templateUrl: './calendar-application.component.html',
  providers: [CalendarApplicationService]
})

export class CalendarApplicationComponent extends ApplicationBaseComponent implements OnInit {
  /**
   * Defines if application should be in popup or widget mode
   */
  @Input() modal: Boolean;
  /**
   * Defines if it is in no account state or has account assigned
   */
  public noAccount: Boolean = false;
  /**
   * Defines view of the application
   */
  public view: String = 'month';
  /**
   * Active date, dafaultly current
   */
  public viewDate: Date = new Date();
  /**
   * Events on the clicked date
   */
  public currentEvents: CalendarEvent[] = [];
  /**
   * Calendar events
   */
  public events: CalendarEvent[] = [];
  /**
   * Array of alerts for AlertComponent
   */
  public alerts: Array<AlertInterface> = [];

  /**
   * Object for newly created event
   */
  public new_event: CalendarEvent = {
    title: null, start: null, end: null
  };
  /**
   * Object for currently edited event
   */
  public edit_event: CalendarEvent = {
    title: null, start: null, end: null
  };
  /**
   * Selected dates for new event
   */
  public selectedMoments = [
    new Date(), new Date()
  ];
  /**
   * Selected dated for edited event
   */
  public selectedEditedMoments = [
    new Date(), new Date()
  ];

  constructor(private appManagerService: ApplicationManagerService,
              private calendarService: CalendarApplicationService,
              public  popupService: NgbModal) {
    super();
  }

  /**
   * Loads events and initialises state
   */
  ngOnInit() {
    this.loadEvents();
    if (!this.widget.account) {
      this.noAccount = true;
    }
  }

  /**
   * Returns true if string corresponds current state
   */
  isState(state: String) {
    return state === this.state && !this.noAccount;
  }

  /**
   * Sets current state
   */
  setState(state: String) {
    this.state = state;
  }

  /**
   * Loads events of the user
   */
  loadEvents() {
    const _that = this;
    const callback = (response: any): void => {
      const googleEvents = <GoogleEvent[]> response.result.items;
      _that.events = _that.calendarService.parseEvents(googleEvents);
    };
    this.calendarService.login(true, callback);
  }

  /**
   * Action after day is clicked - sets variables viewData and currentEvents
   */
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.viewDate = date;
    this.currentEvents = events;
  }

  /**
   * Adds account gathered from user
   */
  addAccount() {
    const _that = this;
    const popup = this.popupService.open(CalendarAddAccountComponent, {size: 'lg'});
    popup.componentInstance.widget = this.widget;
    popup.componentInstance.addAccountCallback = (data) => {
      _that.noAccount = false;
      _that.widget.account = data['id'];
      this.appManagerService.updateWidget(_that.widget).subscribe();
    };
  }

  /**
   * Saves nedited event
   */
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
    this.calendarService.editEvent(this.edit_event, callback);
  }

  /**
   * Sets variables for event editing and skips to editing mode
   */
  editEvent(index) {
    this.edit_event = this.currentEvents[index];
    this.selectedEditedMoments[0] = this.edit_event.start;
    this.selectedEditedMoments[1] = this.edit_event.end;
    this.view = 'edit';
  }

  /**
   * Removes event
   */
  removeEvent(index) {
    const _that = this;
    const callback = (): void => {
      _that.currentEvents.splice(index, 1);
      _that.loadEvents();
    };
    this.calendarService.removeEvent(this.currentEvents[index], callback);
  }

  /**
   * Creates new event
   */
  createEvent() {
    this.alerts = [];
    const _that = this;

    const callback = (response: any): void => {
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

