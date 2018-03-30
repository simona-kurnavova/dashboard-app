import {Component, OnInit} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarApplicationService} from './calendar-application.service';

@Component({
  selector: 'calendar-add-account',
  templateUrl: './calendar-add-account.component.html',
})
export class CalendarAddAccountComponent {
  static CLIENT_ID = 'https://calendar.google.com/calendar/ical/simasya.k%40gmail.com/private-56a76f0808c528d1297e2fdaecc2946f/basic.ics';
  static API_KEY = 'AIzaSyAOR3UpcM2-6VxHylLX_gF1LtGjnT7W404';

  constructor(public activeModal: NgbActiveModal, public calendarService: CalendarApplicationService) {}

  logIn() {
    this.calendarService.logIn();
  }
}

MAPPINGS['calendar-add-account'] = CalendarAddAccountComponent;
