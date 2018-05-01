import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddWidgetContent} from '../popup.components/add-widget-content.component';
import {DashboardInterface, DashboardService} from '../../services/dashboard.service';
import {WidgetInterface, WidgetService} from '../../services/widget.service';
import {AlertInterface, SERVER_ERROR_ALERT} from '../../alert-definitions';
import {WidgetMatrixService} from '../../services/widget-matrix.service';

/**
 * Represents dashboard and its logic
 */

@Component({
  selector: 'dashboard',
  templateUrl: './templates/dashboard.component.html',
  providers: [NgbModal, DashboardService, WidgetService]
})

export class DashboardComponent implements OnInit {
  /**
   * State of the dashboard, normal or edit
   */
  public state: String = 'normal';
  /**
   * List of dashboards owned by user
   */
  public dashboardList: DashboardInterface[];
  /**
   * List of widgets for active dashboard in normal mode
   */
  public widgetList: WidgetInterface[] = [];
  /**
   * List of widgets on active dashboard in edit mode
   */
  public widgetListEdit: WidgetInterface[] = [];
  /**
   * Array of alerts passed to Alert component
   */
  public alerts: Array<AlertInterface> = [];
  /**
   * Index of active dashboard in dashboardList array
   */
  public activeDashboard: number;
  /**
   * Defines if the dashboard is empty, used when showing "no widgets" card on dashboard
   */
  public noWidgets: Boolean;

  /**
   * Defines justification of the widgets
   */
  public justification: String = 'left';

  constructor(private popupService: NgbModal,
              private dashboardService: DashboardService,
              private widgetService: WidgetService) {}

  /**
   * Sets default values of attributes, calls loadResources()
   */
  ngOnInit() {
    this.noWidgets = false;
    this.activeDashboard = 0;
    this.loadWidgets();
  }

  /**
   * Loads widgets from database and parses them to arrays for normal and edit state
   */
  loadWidgets() {
    this.dashboardService.retrieveAll().subscribe(
      dashboards => {
        this.dashboardList = <DashboardInterface[]>dashboards['results'];
        this.justification = this.dashboardList[this.activeDashboard].justification;
        this.widgetService.retrieveAll().subscribe(
          widgets => {
            this.noWidgets = widgets['results'].length <= 0;
            this.widgetList = WidgetMatrixService.parseWidgets(<WidgetInterface[]>widgets['results']);
            this.widgetListEdit  = JSON.parse(JSON.stringify(this.widgetList));
            this.setState('normal');
          }, () => this.alerts.push(SERVER_ERROR_ALERT)
        );
      }, () => this.alerts.push(SERVER_ERROR_ALERT)
    );
  }

  /**
   * Returns true if given string represents current state
   */
  isState(state: String) {
    return this.state === state;
  }

  /**
   * Sets state of dashboard: normal or edit
   */
  setState(state: String) {
    this.state = state;
  }

  /**
   * Triggers popup for adding new widget to the dashboard - component AddWidgetContent in Bootstrap modal window
   */
  addWidget() {
    const popup = this.popupService.open(AddWidgetContent);
    popup.componentInstance.widgetListEdit = this.widgetListEdit;
    popup.componentInstance.currentDashboard = this.dashboardList[this.activeDashboard].id;
  }

  /**
   * Called when cancelling edit state, loads old widgets and disregards all changes made in edit state
   */
  cancelEdit() {
    this.loadWidgets();
  }

  /**
   * Saves new state of widgets after editing to database and loads new normal state with changes applied
   */
  saveEdit() {
    if (this.justification !== this.dashboardList[this.activeDashboard].justification) {
      this.dashboardList[this.activeDashboard].justification = this.justification;
      this.dashboardService.edit(this.dashboardList[this.activeDashboard].id,
        this.dashboardList[this.activeDashboard]).subscribe(
        () => this.saveWidgets()
      );
    } else {
      this.saveWidgets();
    }
  }

  saveWidgets() {
    for (let i = 0; i < this.widgetListEdit.length; i++) {
      this.widgetListEdit[i].position_x = i;
      if (!this.widgetListEdit[i].deleted) {
        this.widgetService.edit(this.widgetListEdit[i].id, this.widgetListEdit[i]).subscribe(
          () => this.loadWidgets(),
          () => this.alerts.push(SERVER_ERROR_ALERT)
        );
      } else {
        this.widgetService.delete(this.widgetListEdit[i].id).subscribe(
          () => this.loadWidgets(),
          () => this.alerts.push(SERVER_ERROR_ALERT)
        );
      }
    }
  }


  getWidgetSize(widget: WidgetInterface) {
    if (widget.deleted) {
      return 0;
    } else {
      return widget.size_x;
    }
  }
}
