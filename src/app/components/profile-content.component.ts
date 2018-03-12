import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'profile-content',
  templateUrl: './templates/profile-content.html',
  providers: [ AuthService ],
})

export class ProfileContent {
  constructor(private service: AuthService) {}
}
