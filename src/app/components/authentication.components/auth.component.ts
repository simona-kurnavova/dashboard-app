import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'login',
  providers: [ AuthService ],
  templateUrl: './templates/auth.component.html'
})

export class AuthComponent {
  constructor(private authService: AuthService) {
    authService.isLoggedIn();
  }
}
