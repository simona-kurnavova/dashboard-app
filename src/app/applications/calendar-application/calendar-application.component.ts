import {Component, Input, OnInit} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {CalendarEvent} from 'angular-calendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import {CalendarApplicationService, GoogleEvent} from './calendar-application.service';
import {CalendarAddAccountComponent} from './calendar-add-account.component';
import {WidgetInterface} from '../../services/widget.service';

@Component({
  selector: 'calendar-application',
  templateUrl: './calendar-application.component.html',
})

export class CalendarApplicationComponent implements OnInit {
  @Input() state: String = 'normal';
  @Input() widget: WidgetInterface;
  @Input() modal: Boolean;
  public view: String = 'month';
  public viewDate: Date = new Date();
  public currentEvents: CalendarEvent[] = [];
  public events: CalendarEvent[] = [];
  public clickedDate: Date;
  activeDayIsOpen: Boolean = true;

  constructor(private calendarService: CalendarApplicationService,
              public  popupService: NgbModal) {}

  ngOnInit() {
    this.loadEvents();
    // TODO: if no Account assigned -> noAccount state
  }

  isState(state: String) {
    return state === this.state;
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
    this.popupService.open(CalendarAddAccountComponent, {size: 'lg'});
  }

  scrollable() {
    if (!this.modal) {
      return 'pre-scrollable calendar-scroll';
    }
  }

}
MAPPINGS['calendar-application'] = CalendarApplicationComponent;


