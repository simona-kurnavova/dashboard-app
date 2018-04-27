import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  providers: [ AuthService ],
  templateUrl: './templates/auth.component.html'
})

export class AuthComponent {
  constructor(private authService: AuthService,
              private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }
}
