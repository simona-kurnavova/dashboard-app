import {Component, OnInit} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {ApplicationBaseComponent} from '../application-base.component';
import {OneNoteApplicationService} from './onenote-application.service';

@Component({
  selector: 'onenote-application',
  templateUrl: './onenote-application.component.html',
})

export class OneNoteApplicationComponent extends ApplicationBaseComponent implements OnInit {

  constructor(private appService: OneNoteApplicationService) {
    super();
  }

  ngOnInit() {}

  getToken() {
    this.appService.getToken();
  }

  getAccessToken() {
    this.appService.getAccessToken();
  }
}

MAPPINGS['onenote-application'] = OneNoteApplicationComponent;
