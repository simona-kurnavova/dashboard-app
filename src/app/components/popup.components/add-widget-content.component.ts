import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApplicationInterface, ApplicationService} from '../../services/application.service';
import {WidgetInterface, WidgetService} from '../../services/widget.service';
import {WidgetMatrixService} from '../../services/widget-matrix.service';
import {ADD_WIDGET_ERROR_ALERT, AlertInterface, SERVER_ERROR_ALERT} from '../../authentication-alerts';

/**
 * Content component for Bootstrap modal window
 * Allows adding widgets to the dashboard by choosing application
 */
@Component({
  selector: 'add-widget-content',
  templateUrl: './templates/add-widget-content.html',
  providers: [NgbActiveModal, ApplicationService, WidgetService]
})

export class AddWidgetContent implements OnInit {
  /**
   * Widget list of current dashboard passed from dashboard
   */
  @Input() widgetListEdit = [[]];
  /**
   * ID of current dashboard
   */
  @Input() currentDashboard: number;
  /**
   * List of available applications
   */
  public appList: ApplicationInterface[];

  /**
   * Array of alerts passed to AlertComponent
   */
  public alerts: AlertInterface[] = [];

  constructor(public activeModal: NgbActiveModal,
              private appService: ApplicationService,
              private widgetService: WidgetService) {}

  /**
   * Calls loadApps()
   */
  ngOnInit() {
    this.loadApps();
  }

  /**
   * Retrieves application list from database
   */
  loadApps() {
    this.appService.retrieveAll().subscribe(
      data => {
        this.appList = <ApplicationInterface[]>data['results'];
      }, () => this.alerts.push(SERVER_ERROR_ALERT)
    );
  }

  /**
   * Adds new Widget to database with chosen application and also adds it to dashboard widgetListEdit
   */
  addWidget(id: Number) {
    this.widgetService.retrieveAll().subscribe(
      widgets => {
        let widget = WidgetMatrixService.createWidget(id, null, this.currentDashboard, <WidgetInterface[]>widgets['results']);
        this.widgetService.create(widget).subscribe(
          data => {
            widget = <WidgetInterface>data;
            const widgetRow: WidgetInterface[] = [widget];
            this.widgetListEdit.push(widgetRow);
            this.activeModal.dismiss();
          }, () => this.alerts.push(ADD_WIDGET_ERROR_ALERT)
        );
      }, () => this.alerts.push(ADD_WIDGET_ERROR_ALERT)
    );
  }
}
