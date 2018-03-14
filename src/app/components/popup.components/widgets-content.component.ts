import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApplicationInterface, ApplicationService } from '../../services/application.service';

@Component({
  selector: 'widgets-content',
  templateUrl: './templates/widgets-content.html',
  providers: [ AuthService ],
})

export class WidgetsContent {
  @Input() state: String = 'list';
  appList: ApplicationInterface[];
  currentApp: Number;

  constructor(private authService: AuthService, private appService: ApplicationService) {}

  ngOnInit() {
    this.setState('list');
    this.getList();
  }

  getList() {
    this.appService.retrieveAll().subscribe(
      data => {
        this.appList = <ApplicationInterface[]>data['results'];
        console.log(this.appList);
      },
      err => {
        console.log(err);
        this.setState('error');
      }
    );
  }

  isState(state: String) {
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
