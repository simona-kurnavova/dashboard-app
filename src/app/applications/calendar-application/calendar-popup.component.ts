import {Component} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'calendar-popup',
  templateUrl: './calendar-popup.component.html',
})
export class CalendarPopupComponent {
  constructor(public activeModal: NgbActiveModal) {}
}

MAPPINGS['calendar-popup'] = CalendarPopupComponent;
