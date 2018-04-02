import {Component, Input, OnInit} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarApplicationService} from './calendar-application.service';
import {AlertInterface} from '../../authentication-alerts';
import {WidgetInterface} from '../../services/widget.service';

@Component({
  selector: 'calendar-add-account',
  templateUrl: './calendar-add-account.component.html',
})
export class CalendarAddAccountComponent {
  @Input() widget: WidgetInterface;
  @Input() addAccountCallback;
  public alerts: Array<AlertInterface> = [];

  constructor(public activeModal: NgbActiveModal, public calendarService: CalendarApplicationService) {}

  addAccount() {
    this.calendarService.addAccount(this.widget, this.addAccountCallback);
  }

  public closeAlert(alert: AlertInterface) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}

MAPPINGS['calendar-add-account'] = CalendarAddAccountComponent;
