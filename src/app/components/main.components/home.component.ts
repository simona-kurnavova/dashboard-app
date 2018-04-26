import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'home',
  templateUrl: './templates/home.component.html',
  providers: [AuthService],
})

export class HomeComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkCredentials();
  }
}
