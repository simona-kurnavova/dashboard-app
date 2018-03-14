import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertInterface, EMPTY_PASSWORD_ALERT, EMPTY_USERNAME_ALERT } from '../../authentication-alerts';

@Component({
  selector: 'login-form',
  templateUrl: './templates/login-form.component.html',
  styleUrls: ['./styles/form-style.css'],
  providers: [ AuthService ],
})

export class LoginFormComponent {
  public loginData = {username: '', password: ''};
  public alerts: Array<AlertInterface> = [];

  constructor(private service: AuthService) {}

  login() {
    if (this.loginData.username === '') {
      this.alerts.push(EMPTY_USERNAME_ALERT);
      return;
    }

    if (this.loginData.password === '') {
      this.alerts.push(EMPTY_PASSWORD_ALERT);
      return;
    }
    this.service.getToken(this.loginData);
    this.alerts = [];
  }

  public closeAlert(alert: AlertInterface) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
