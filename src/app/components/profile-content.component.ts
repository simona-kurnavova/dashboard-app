import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UserService, UserInterface} from '../services/user.service';

@Component({
  selector: 'profile-content',
  templateUrl: './templates/profile-content.html',
  providers: [ AuthService ],
})

export class ProfileContent {
  user: UserInterface = {
    username: '',
    password: '',
    email: ''
  };
  constructor(private service: AuthService, private userService: UserService) {
    this.getUser();
  }
  getUser() {
    this.userService.retrieve().subscribe(
      data => {
        console.log(data);
        this.user = (<UserInterface[]>data['results'])[0];
      },
      err => console.log(err)
    );
  }
}
