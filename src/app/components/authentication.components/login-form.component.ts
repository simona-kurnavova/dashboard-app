import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertInterface, EMPTY_PASSWORD_ALERT, EMPTY_USERNAME_ALERT } from '../../authentication-alerts';
import { HttpErrorHandler } from '../../services/http-error-handler.service';

@Component({
  selector: 'login-form',
  templateUrl: './templates/login-form.component.html',
  styleUrls: ['./styles/form-style.css'],
  providers: [ AuthService ],
})

export class LoginFormComponent {
  public loginData = {username: '', password: ''};
  public alerts: Array<AlertInterface> = [];

  constructor(private authService: AuthService) {}

  login() {
    if (this.loginData.username === '') {
      this.alerts.push(EMPTY_USERNAME_ALERT);
      return;
    }

    if (this.loginData.password === '') {
      this.alerts.push(EMPTY_PASSWORD_ALERT);
      return;
    }
    this.authService.getToken(this.loginData).subscribe(
      data => this.authService.saveToken(data),
      err => {
        this.alerts.push(HttpErrorHandler.getAlert(err['status']));
      }
    );
    this.alerts = [];
  }

  public closeAlert(alert: AlertInterface) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
