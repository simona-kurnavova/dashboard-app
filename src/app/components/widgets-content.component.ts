import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {ApplicationInterface, ApplicationService} from '../services/application.service';

@Component({
  selector: 'widgets-content',
  templateUrl: './templates/widgets-content.html',
  providers: [ AuthService ],
})

export class WidgetsContent {
  appList: ApplicationInterface[];
  constructor(private authService: AuthService, private appService: ApplicationService) {}

  ngOnInit() {
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
      }
    );
  }

}
