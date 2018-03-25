import {Component} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'calendar-add-account',
  templateUrl: './calendar-add-account.component.html',
})
export class CalendarAddAccountComponent {
  constructor(public activeModal: NgbActiveModal) {}
}

MAPPINGS['calendar-add-account'] = CalendarAddAccountComponent;
