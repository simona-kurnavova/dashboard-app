import {Component} from '@angular/core';
import { AuthService } from '../services/auth.service';
import {WidgetInterface, WidgetService} from '../services/widget.service';

@Component({
  selector: 'home',
  templateUrl: './templates/home.component.html',
  providers: [ AuthService ],
})

export class HomeComponent {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.checkCredentials();
  }

  logout() {
    this.authService.logout();
  }
}

