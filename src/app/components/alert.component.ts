import {Component, Input} from '@angular/core';
import {AlertInterface} from '../authentication-alerts';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  providers: [],
})

export class AlertComponent {
  @Input() alerts: Array<AlertInterface>;

  public closeAlert(alert: AlertInterface) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
