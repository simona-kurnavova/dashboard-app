import { Component } from '@angular/core';
import { AuthService, UserInterface } from '../services/auth.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'registration-form',
  providers: [ AuthService ],
  templateUrl: './templates/registration-form.component.html'
})

// TODO: username validation: 150 characters or fewer. Letters, digits and @/./+/-/_ only.
// TODO: validation of required fields

export class RegistrationFormComponent {
  public user: UserInterface = {
    username: '',
    password: '',
    email: ''
  };
  constructor(private userService: UserService) {}

  register() {
    this.userService.create(this.user);
  }
}
