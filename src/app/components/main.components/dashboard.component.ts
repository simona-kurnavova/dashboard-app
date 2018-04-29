import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddWidgetContent} from '../popup.components/add-widget-content.component';
import {DashboardInterface, DashboardService} from '../../services/dashboard.service';
import {WidgetInterface, WidgetService} from '../../services/widget.service';
import {WidgetMatrixService} from '../../services/widget-matrix.service';
import {AlertInterface, SERVER_ERROR_ALERT} from '../../authentication-alerts';

@Component({
  selector: 'dashboard',
  providers: [ ],
  templateUrl: './templates/dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  public state: String = 'normal';
  public widgetJustify: String = 'center';
  public dashboardList: DashboardInterface[];
  public widgetList: WidgetInterface[][] = [];
  public widgetListEdit: WidgetInterface[][] = [];
  public alerts: Array<AlertInterface> = [];
  public activeDashboard: number;
  public noWidgets: Boolean;

  constructor(private popupService: NgbModal,
              private dashboardService: DashboardService,
              private widgetService: WidgetService) {}

  ngOnInit() {
    this.noWidgets = false;
    this.activeDashboard = 0;
    this.loadWidgets();
  }

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

  isState(state: String) {
    return this.state === state;
  }

  setState(state: String) {
    this.state = state;
  }

  addWidget() {
    const popup = this.popupService.open(AddWidgetContent);
    popup.componentInstance.currentEditAppList = this.widgetListEdit;
    popup.componentInstance.currentDashboard = this.dashboardList[this.activeDashboard].id;
  }

  cancelEdit() {
    this.loadWidgets();
  }

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
