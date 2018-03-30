import {Component, Input, OnInit} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {CalendarEvent} from 'angular-calendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import {CalendarApplicationService} from './calendar-application.service';

@Component({
  selector: 'calendar-application',
  templateUrl: './calendar-application.component.html',
})

export class CalendarApplicationComponent implements OnInit {
  @Input() state = 'normal';
  view: String = 'month';
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  clickedDate: Date;

  constructor(private modal: NgbModal, private calendarService: CalendarApplicationService) {}

  ngOnInit() {
    this.calendarService.login();
  }

  isState(state: String) {
    return state === this.state;
  }

  getEvents() {
    this.calendarService.getList();
  }
}
MAPPINGS['calendar-application'] = CalendarApplicationComponent;


