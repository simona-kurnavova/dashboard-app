import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'registration-form',
  providers: [ AuthService ],
  templateUrl: './templates/registration-form.component.html'
})

// TODO: username validation: 150 characters or fewer. Letters, digits and @/./+/-/_ only.
// TODO: validation of required fields

export class RegistrationFormComponent {
  constructor(private service: AuthService) {}

  register() {
    console.log('registration test');
  }
}
