import {Component, Input} from '@angular/core';
import {renderComponent} from '@angular/core/src/render3';

@Component({
  selector: 'notification',
  templateUrl: './templates/custom-notification.component.html',
})

export class CustomNotificationComponent {
  @Input()
  public alerts: Array<IAlert> = [];

  constructor() {
    const alert: IAlert = {
      id: 2,
      type: 'danger',
      message: 'Hello from constructor',
    };
    this.alerts.push(alert);
  }

  public addAlert(alert: IAlert) {
    console.log('In the addAlert');
    this.alerts.push(alert);
    console.log(this.alerts);
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
