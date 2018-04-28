import {Component, Input, OnInit} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarApplicationService} from './calendar-application.service';
import {ACCOUNT_ADDED_ALERT, AlertInterface, SERVER_ERROR_ALERT} from '../../authentication-alerts';
import {WidgetInterface, WidgetService} from '../../services/widget.service';

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
              public calendarService: CalendarApplicationService,
              private widgetService: WidgetService) {}

  addAccount() {
    const callback = (data) => {
      this.widget.account = data['id'];
      this.widgetService.edit(this.widget.id, this.widget).subscribe(
        data => this.alerts.push(ACCOUNT_ADDED_ALERT),
        err => this.alerts.push(SERVER_ERROR_ALERT)
      );
    };
    this.calendarService.addAccount(callback, this.addAccountCallback);
  }

  public closeAlert(alert: AlertInterface) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}

MAPPINGS['calendar-add-account'] = CalendarAddAccountComponent;
