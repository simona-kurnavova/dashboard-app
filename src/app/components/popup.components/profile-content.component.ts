import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService, UserInterface } from '../../services/user.service';
import {AlertInterface, SERVER_ERROR_ALERT, USER_EDITED_ALERT} from '../../authentication-alerts';

@Component({
  selector: 'profile-content',
  templateUrl: './templates/profile-content.html',
  providers: [ AuthService ],
})

export class ProfileContent implements OnInit{
  private state: String;
  public user: UserInterface = {
    id: null, username: '', password: '', email: ''
  };
  public alerts: Array <AlertInterface> = [];

  constructor(private service: AuthService, private userService: UserService) {}

  getUser() {
    this.userService.retrieve().subscribe(
      data => {
        console.log(data);
        this.user = (<UserInterface[]>data['results'])[0];
      },
      err => {
        this.alerts.push(SERVER_ERROR_ALERT);
      }
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
    this.alerts = [];
    this.state = state;
  }

  saveUser() {
    this.setState('normal');
    this.userService.update(this.user).subscribe(
      data => {
        this.alerts.push(USER_EDITED_ALERT);
      },
      err => {
        console.log(err);
        this.alerts.push(SERVER_ERROR_ALERT);
      }
    );
  }

  public closeAlert(alert: AlertInterface) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
