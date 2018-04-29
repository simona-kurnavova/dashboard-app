import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserService, UserInterface} from '../../services/user.service';
import {AlertInterface, SERVER_ERROR_ALERT, USER_EDITED_ALERT} from '../../authentication-alerts';

/**
 * Represents profile settings, allowing user to change their user data
 */
@Component({
  selector: 'profile-content',
  templateUrl: './templates/profile-content.html',
  providers: [AuthService, UserService],
})

export class ProfileContent implements OnInit {
  /**
   * State of component
   */
  private state: String;
  /**
   * Array of alerts passed to AlertComponent for error handling
   */
  public alerts: Array <AlertInterface> = [];
  /**
   * Stores user data
   */
  public user: UserInterface = {
    id: null, username: '', password: '', email: ''
  };

  constructor(private service: AuthService,
              private userService: UserService) {}

  /**
   * Sets default state and calls loadUser()
   */
  ngOnInit() {
    this.state = 'normal';
    this.loadUser();
  }

  /**
   * Retrieves user from database
   */
  loadUser() {
    this.userService.retrieve().subscribe(
      data => this.user = (<UserInterface[]>data['results'])[0],
      () => this.alerts.push(SERVER_ERROR_ALERT)
    );
  }

  /**
   * Returns true if given string is current state
   */
  isState(state: String) {
    return this.state === state;
  }

  /**
   * Sets current state of the component
   */
  setState(state: String) {
    this.alerts = [];
    this.state = state;
  }

  /**
   * Saves new user data to database
   */
  saveUser() {
    this.setState('normal');
    this.userService.update(this.user).subscribe(
      () => this.alerts.push(USER_EDITED_ALERT),
      () => this.alerts.push(SERVER_ERROR_ALERT)
    );
  }
}
