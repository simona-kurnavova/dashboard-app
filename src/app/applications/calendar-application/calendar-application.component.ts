import {Component, Input, OnInit} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {CalendarEvent} from 'angular-calendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import {CalendarApplicationService, GoogleEvent} from './calendar-application.service';
import {CalendarAddAccountComponent} from './calendar-add-account.component';
import {WidgetInterface} from '../../services/widget.service';
import {ApplicationBaseComponent} from '../application-base.component';

@Component({
  selector: 'calendar-application',
  templateUrl: './calendar-application.component.html',
})

export class CalendarApplicationComponent extends ApplicationBaseComponent implements OnInit {
  @Input() modal: Boolean;
  public noAccount = false;
  public view: String = 'month';
  public viewDate: Date = new Date();
  public currentEvents: CalendarEvent[] = [];
  public events: CalendarEvent[] = [];
  public clickedDate: Date;
  public activeDayIsOpen: Boolean = true;

  constructor(private calendarService: CalendarApplicationService,
              public  popupService: NgbModal) {
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
    popup.componentInstance.addAccountCallback = () => {
      _that.noAccount = false;
    };
  }

  scrollable() {
    if (!this.modal) {
      return 'pre-scrollable calendar-scroll';
    }
  }

}
MAPPINGS['calendar-application'] = CalendarApplicationComponent;


