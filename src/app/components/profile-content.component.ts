import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UserService, UserInterface} from '../services/user.service';

@Component({
  selector: 'profile-content',
  templateUrl: './templates/profile-content.html',
  providers: [ AuthService ],
})

export class ProfileContent {
  private state: String;
  public user: UserInterface = {
    id: null, username: '', password: '', email: ''
  };

  constructor(private service: AuthService, private userService: UserService) {}

  getUser() {
    this.userService.retrieve().subscribe(
      data => {
        console.log(data);
        this.user = (<UserInterface[]>data['results'])[0];
      },
      err => console.log(err)
    );
  }

  ngOnInit() {
    this.state = 'normal';
    this.getUser();
  }

  isState(state: String) {
    return this.state === state;
  }

  setState(state: String) {
    this.state = state;
  }

  saveUser() {
    this.setState('normal');
    /*this.userService.update(this.user).subscribe(
      data => console.log(data),
      err => console.log(err)
    );*/
    // TODO: notification of success/error
    // TODO: user update
  }
}
