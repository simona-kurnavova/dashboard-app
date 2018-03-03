import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './templates/login-form.component.html',
  styleUrls: ['./styles/login-form.component.css']
})

export class LoginFormComponent {
  public loginData = {username: '', password: ''};
  constructor(private service: AuthService) {}

  login() {
    this.service.getToken(this.loginData);
  }
}