import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {CustomNotificationComponent, IAlert} from './custom-notification.component';

@Component({
  selector: 'login-form',
  templateUrl: './templates/login-form.component.html',
  styleUrls: ['./styles/login-form.component.css'],
  providers: [ AuthService, CustomNotificationComponent ],
})

export class LoginFormComponent {
  public loginData = {username: '', password: ''};
  constructor(private service: AuthService, private customNotification: CustomNotificationComponent) {}

  login() {
    this.service.getToken(this.loginData);
  }
}
