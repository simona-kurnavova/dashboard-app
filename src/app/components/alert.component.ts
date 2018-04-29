import {Component, Input} from '@angular/core';
import {AlertInterface} from '../authentication-alerts';

/**
 * Component using Bootstrap Alerts
 */

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
})

export class AlertComponent {
  /**
   * Array of alerts
   */
  @Input() alerts: Array<AlertInterface>;

  /**
   * Required method by Bootstrap for closing alerts
   */
  public closeAlert(alert: AlertInterface) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
