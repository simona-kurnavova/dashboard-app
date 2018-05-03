import {Component} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PopupBaseComponent} from '../../components/main.components/popup-base.component';

/**
 * Google Calendar application popup component
 */
@Component({
  selector: 'calendar-popup',
  templateUrl: './calendar-popup.component.html',
})
export class CalendarPopupComponent extends PopupBaseComponent {
  constructor(public activeModal: NgbActiveModal) {
    super();
  }
}

MAPPINGS['calendar-popup'] = CalendarPopupComponent;
