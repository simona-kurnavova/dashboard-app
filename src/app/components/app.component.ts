import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './templates/app.component.html',
  styleUrls: ['./styles/app.component.css']
})

export class AppComponent {
  title = 'Dashboard';
  constructor(private authService: AuthService) {}

  isSignedIn() {
    return this.authService.isSignedIn();
  }
}
