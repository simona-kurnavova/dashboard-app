import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'menu',
  templateUrl: './templates/menu.component.html',
})

export class MenuComponent {
  public username = 'Username';
  constructor(private authService: AuthService) {}
  logout() {
    this.authService.logout();
  }
}
