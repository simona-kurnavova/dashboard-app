import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login-form',
  providers: [ AuthService ],
  templateUrl: './templates/login.component.html'
})

export class LoginComponent {
  public loginData = {username: '', password: ''};

  constructor(private service: AuthService) {}

  login() {
    this.service.getToken(this.loginData);
  }
}
