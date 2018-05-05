import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AlertInterface, EMPTY_PASSWORD_ALERT, EMPTY_USERNAME_ALERT} from '../../alert-definitions';
import {HttpErrorHandler} from '../../services/http-error-handler.service';
import {Router} from '@angular/router';
import {DashboardInterface, DashboardService} from '../../services/dashboard.service';

/**
 * Manages user login, provides forms, error handling and validations
 */
@Component({
  selector: 'login-form',
  styleUrls: ['./styles/form-style.css'],
  templateUrl: './templates/login-form.component.html',
  providers: [AuthService],
})

export class LoginFormComponent {
  /**
   * Object for storing login data: username and password from the user input
   */
  public loginData = {username: '', password: ''};
  /**
   * Array of alerts passed to AlertComponent for error handling
   */
  public alerts: AlertInterface[] = [];

  constructor(private authService: AuthService,
              public router: Router) {
    if (authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  /**
   * Action after user inserts login data, validates them and calls AuthService for authentication handling
   */
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
      data => this.authService.saveToken(data),
      err => this.alerts.push(HttpErrorHandler.getAlert(err['status']))
    );
  }
}
