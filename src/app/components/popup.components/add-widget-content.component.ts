import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationInterface, ApplicationService } from '../../services/application.service';
import {WidgetInterface, WidgetService} from '../../services/widget.service';
import {WidgetMatrixService} from '../../services/widget-matrix.service';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'add-widget-content',
  templateUrl: './templates/add-widget-content.html',
})

export class AddWidgetContent {
  public appList: ApplicationInterface[];

  constructor(public activeModal: NgbActiveModal,
              private appService: ApplicationService,
              private widgetService: WidgetService,
              private accountService: AccountService,
              private router: Router) {}

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
    // TODO: send to add account flow
    this.accountService.retrieveAll().subscribe(
      data => console.log(data),
      err => console.log(err)
    );

    this.widgetService.retrieveAll().subscribe(
      // TODO: remove fixed account after add flow implemented
      widgets => {
        const widget = WidgetMatrixService.createWidget(id, 5, 4, <WidgetInterface[]>widgets['results']);
        this.widgetService.create(widget).subscribe(
          data => console.log(data),
          err => console.log(err)
        );
        },
      err => console.log(err)
    );
    this.activeModal.dismiss();
    this.router.navigate(['/home']);
  }
}
