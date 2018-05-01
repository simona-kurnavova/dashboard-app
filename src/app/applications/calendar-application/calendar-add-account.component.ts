import {Component, Input, OnInit} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarApplicationService} from './calendar-application.service';
import {ACCOUNT_ADDED_ALERT, AlertInterface} from '../../alert-definitions';
import {WidgetInterface} from '../../services/widget.service';

@Component({
  selector: 'calendar-add-account',
  templateUrl: './calendar-add-account.component.html',
  providers: [CalendarApplicationService]
})
export class CalendarAddAccountComponent {
  @Input() widget: WidgetInterface;
  @Input() addAccountCallback;
  public alerts: Array<AlertInterface> = [];

  constructor(public activeModal: NgbActiveModal,
              public calendarService: CalendarApplicationService) {}

  addAccount() {
    const callback = () => {
      this.alerts.push(ACCOUNT_ADDED_ALERT);
    };
    this.calendarService.addAccount(this.addAccountCallback, callback);
  }
}

MAPPINGS['calendar-add-account'] = CalendarAddAccountComponent;
