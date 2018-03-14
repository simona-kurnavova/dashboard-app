import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationInterface, ApplicationService } from '../../services/application.service';

@Component({
  selector: 'add-widget-content',
  templateUrl: './templates/add-widget-content.html',
})
export class AddWidgetContent {
  public appList: ApplicationInterface[];

  constructor(public activeModal: NgbActiveModal, private appService: ApplicationService) {}

  ngOnInit() {
    this.appService.retrieveAll().subscribe(
      data => {
        this.appList = <ApplicationInterface[]>data['results'];
        console.log(this.appList);
      },
      err => console.log(err)
    );
  }

  addWidget(id: Number) {
    // TODO widget's flow of account addition
  }
}
