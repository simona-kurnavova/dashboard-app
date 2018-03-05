import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './templates/login-form.component.html',
  styleUrls: ['./styles/form-style.css'],
  providers: [ AuthService ],
})

export class LoginFormComponent {
  public loginData = {username: '', password: ''};
  constructor(private service: AuthService) {}

  login() {
    console.log(this.loginData);
    this.service.getToken(this.loginData);
  }
}
