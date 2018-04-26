import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApplicationInterface, ApplicationService} from '../../services/application.service';
import {WidgetInterface, WidgetService} from '../../services/widget.service';
import {WidgetMatrixService} from '../../services/widget-matrix.service';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'add-widget-content',
  templateUrl: './templates/add-widget-content.html',
})

export class AddWidgetContent implements OnInit {
  @Input() currentEditAppList = [[]];
  @Input() currentDashboard: number;
  public appList: ApplicationInterface[];

  constructor(public activeModal: NgbActiveModal,
              private appService: ApplicationService,
              private widgetService: WidgetService,
              private accountService: AccountService) {}

  ngOnInit() {
    // TODO: handle error
    this.appService.retrieveAll().subscribe(
      data => {
        this.appList = <ApplicationInterface[]>data['results'];
        console.log(this.appList);
      },
      err => console.log(err)
    );
  }

  addWidget(id: Number) {
    this.accountService.retrieveAll().subscribe(
      data => console.log(data),
      err => console.log(err)
    );
    this.widgetService.retrieveAll().subscribe(
      widgets => {
        // TODO: find the correct dashboard
        let widget = WidgetMatrixService.createWidget(id, null, this.currentDashboard, <WidgetInterface[]>widgets['results']);
        this.widgetService.create(widget).subscribe(
          data => {
            console.log(data);
            widget = <WidgetInterface>data;
            const widgetRow: WidgetInterface[] = [widget];
            this.currentEditAppList.push(widgetRow);
          },
            err => console.log(err),
        );
        },
      err => console.log(err)
    );
    this.activeModal.dismiss();
  }
}
