import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

/**
 * Homepage component
 */

@Component({
  selector: 'home',
  templateUrl: './templates/home.component.html',
  providers: [AuthService],
})

export class HomeComponent implements OnInit {
  constructor(private authService: AuthService) {}

  /**
   * Checks if user is logged in on every initialization of component, if isn't, redirects to home page
   */
  ngOnInit() {
    this.authService.checkCredentials();
  }
}
