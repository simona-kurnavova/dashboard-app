import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddWidgetContent} from '../popup.components/add-widget-content.component';
import {DashboardInterface, DashboardService} from '../../services/dashboard.service';
import {WidgetInterface, WidgetService} from '../../services/widget.service';
import {WidgetMatrixService} from '../../services/widget-matrix.service';
import {AlertInterface, SERVER_ERROR_ALERT} from '../../authentication-alerts';

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
   * Justification of the dashboard widgets: left, right, center (by default)
   */
  public widgetJustify: String = 'center';
  /**
   * List of dashboards owned by user
   */
  public dashboardList: DashboardInterface[];
  /**
   * List of widgets for active dashboard in normal mode
   */
  public widgetList: WidgetInterface[][] = [];
  /**
   * List of widgets on active dashboard in edit mode
   */
  public widgetListEdit: WidgetInterface[][] = [];
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
        this.widgetService.retrieveAll().subscribe(
          widgets => {
            if (widgets['results'].length <= 0) {
              this.noWidgets = true;
            } else {
              this.noWidgets = false;
            }
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
    for (let row = 0; row < this.widgetListEdit.length; row++) {
      for (let col = 0; col < this.widgetListEdit[row].length; col++) {
        this.widgetListEdit[row][col].position_x = col;
        this.widgetListEdit[row][col].position_y = row;
        if (!this.widgetListEdit[row][col].deleted) {
          this.widgetService.edit(this.widgetListEdit[row][col].id, this.widgetListEdit[row][col]).subscribe(
            () => this.loadWidgets(),
            () => this.alerts.push(SERVER_ERROR_ALERT)
          );
        } else {
          this.widgetService.delete(this.widgetListEdit[row][col].id).subscribe(
            () => this.loadWidgets(),
            () => this.alerts.push(SERVER_ERROR_ALERT)
          );
        }
      }
    }
  }
}
