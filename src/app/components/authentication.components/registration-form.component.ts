import {Component} from '@angular/core';
import {UserService, UserInterface} from '../../services/user.service';
import {AlertInterface, EMPTY_PASSWORD_ALERT, EMPTY_USERNAME_ALERT, USER_REGISTERED_ALERT} from '../../alert-definitions';
import {HttpErrorHandler} from '../../services/http-error-handler.service';

/**
 * Manages user registration and data validation
 */
@Component({
  selector: 'registration-form',
  styleUrls: ['./styles/form-style.css'],
  templateUrl: './templates/registration-form.component.html',
  providers: [UserService]
})


export class RegistrationFormComponent {
  /**
   * Object for storing user registration data
   */
  public user: UserInterface = { id: null, username: '', password: '', email: '' };
  /**
   * Array of alerts passed to AlertComponent for error handling
   */
  public alerts: AlertInterface[] = [];

  constructor(private userService: UserService) {}

  /**
   * Handles registration form validations and passes data to userService for registration
   */
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
      }, err => this.alerts.push(HttpErrorHandler.getAlert(err['status']))
    );
  }
}
