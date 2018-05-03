import {Component, Input, OnInit} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarApplicationService} from './calendar-application.service';
import {ACCOUNT_ADDED_ALERT, AlertInterface} from '../../alert-definitions';
import {WidgetInterface} from '../../services/widget.service';

/**
 * Component handling adding account to Google Calendar in popup
 */
@Component({
  selector: 'calendar-add-account',
  templateUrl: './calendar-add-account.component.html',
  providers: [CalendarApplicationService]
})
export class CalendarAddAccountComponent {
  /**
   * Widget of Calendar application
   */
  @Input() widget: WidgetInterface;
  /**
   * Callback handed from Calendar application component for adding account
   */
  @Input() addAccountCallback;
  /**
   * Array of alerts for error handling
   */
  public alerts: Array<AlertInterface> = [];

  constructor(public activeModal: NgbActiveModal,
              public calendarService: CalendarApplicationService) {}

  /**
   * Adds account to widget
   */
  addAccount() {
    const callback = () => {
      this.alerts.push(ACCOUNT_ADDED_ALERT);
    };
    this.calendarService.addAccount(this.addAccountCallback, callback);
  }
}

MAPPINGS['calendar-add-account'] = CalendarAddAccountComponent;
