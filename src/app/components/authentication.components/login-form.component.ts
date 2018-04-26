import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AlertInterface, EMPTY_PASSWORD_ALERT, EMPTY_USERNAME_ALERT} from '../../authentication-alerts';
import {HttpErrorHandler} from '../../services/http-error-handler.service';

@Component({
  selector: 'login-form',
  styleUrls: ['./styles/form-style.css'],
  templateUrl: './templates/login-form.component.html',
  providers: [AuthService],
})

export class LoginFormComponent {
  public loginData = {username: '', password: ''};
  public alerts: Array<AlertInterface> = [];

  constructor(private authService: AuthService) {}

  login() {
    this.alerts = [];
    if (this.loginData.username === '') {
      this.alerts.push(EMPTY_USERNAME_ALERT);
    }

    if (this.loginData.password === '') {
      this.alerts.push(EMPTY_PASSWORD_ALERT);
    }

    if (this.alerts.length > 0) {
      console.log('returning');
      return;
    }

    this.authService.getToken(this.loginData).subscribe(
      data => {
        this.authService.saveToken(data);
        console.log(data);
      },
      err => {
        this.alerts.push(HttpErrorHandler.getAlert(err['status']));
        console.log(err);
      }
    );
  }

  public closeAlert(alert: AlertInterface) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
