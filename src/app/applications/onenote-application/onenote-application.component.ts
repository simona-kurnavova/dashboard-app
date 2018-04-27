import {Component, OnInit} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {ApplicationBaseComponent} from '../application-base.component';
import {OneNoteApplicationService} from './onenote-application.service';

export interface Notebook {
  name: String;
  sections: any[];
}

@Component({
  selector: 'onenote-application',
  templateUrl: './onenote-application.component.html',
  providers: [OneNoteApplicationService]
})

export class OneNoteApplicationComponent extends ApplicationBaseComponent implements OnInit {
  public notebookList: Notebook[] = [];

  constructor(private appService: OneNoteApplicationService) {
    super();
  }

  ngOnInit() {}

  getCode() {
    this.appService.getCode();
  }

  getAccessToken() {
    // TODO: alerts
    this.appService.getAccessToken().subscribe(
      data => {
        console.log(data);
        this.appService.saveToken(data);
      },
      err => console.log(err)
    );
  }

  getNotebooks() {
    this.appService.getNotebooks().subscribe(
      data => console.log(data),
      err => console.log(err)
    );
  }
}

MAPPINGS['onenote-application'] = OneNoteApplicationComponent;
