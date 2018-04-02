import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService, UserInterface } from '../../services/user.service';
import {
  AlertInterface, EMPTY_PASSWORD_ALERT, EMPTY_USERNAME_ALERT, SERVER_ERROR_ALERT, USER_ALREADY_EXISTS_ALERT,
  USER_REGISTERED_ALERT
} from '../../authentication-alerts';
import {HttpErrorHandler} from '../../services/http-error-handler.service';

@Component({
  selector: 'registration-form',
  providers: [ AuthService ],
  styleUrls: ['./styles/form-style.css'],
  templateUrl: './templates/registration-form.component.html'
})


export class RegistrationFormComponent {
  public user: UserInterface = { id: null, username: '', password: '', email: '' };
  public alerts: Array<AlertInterface> = [];

  constructor(private userService: UserService) {}

  register() {
    this.alerts = [];
    if (this.user.username === '') {
      this.alerts.push(EMPTY_USERNAME_ALERT);
    }
    if (this.user.password === '') {
      this.alerts.push(EMPTY_PASSWORD_ALERT);
    }
    if (this.alerts.length > 0) {
      return;
    }
    this.userService.create(this.user).subscribe(data => {
        this.alerts.push(USER_REGISTERED_ALERT);
      }, err => {
        console.log(err);
        this.alerts.push(HttpErrorHandler.getAlert(err['status']));
      }
    );
  }

  public closeAlert(alert: AlertInterface) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
