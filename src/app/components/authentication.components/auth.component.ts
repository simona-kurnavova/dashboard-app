import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

/**
 * Authentication component which redirects to home, login or registration page
 */
@Component({
  selector: 'login',
  providers: [AuthService],
  templateUrl: './templates/auth.component.html'
})

export class AuthComponent {
  /**
   * Checks if user is logged in, if it is, redirects to homepage
   */
  constructor(private authService: AuthService,
              private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }
}
