import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ApplicationInterface, ApplicationService} from '../../services/application.service';

@Component({
  selector: 'widgets-content',
  templateUrl: './templates/widgets-content.html',
  providers: [AuthService],
})

export class WidgetsContent implements OnInit {
  @Input() state: String = 'list';
  appList: ApplicationInterface[];
  currentApp: Number;

  constructor(private authService: AuthService,
              private appService: ApplicationService) {}

  ngOnInit() {
    this.setState('list');
    this.getList();
  }

  getList() {
    // TODO: handle error and add alerts
    this.appService.retrieveAll().subscribe(
      data => this.appList = <ApplicationInterface[]>data['results'],
      err => console.log(err)
    );
  }

  isState(state: String): Boolean {
    return this.state === state;
  }

  setState(state: String) {
    this.state = state;
  }

  setCurrentApp(index: Number) {
    this.setState('detail');
    this.currentApp = index;
  }
}
