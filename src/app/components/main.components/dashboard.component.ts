import {Component} from '@angular/core';
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

export class DashboardComponent {
  public state: String = 'normal';
  public widgetJustify = 'center';
  public dashboardList: DashboardInterface[];
  public widgetList: WidgetInterface[][] = [];
  public widgetListEdit: WidgetInterface[][];
  public alerts: Array<AlertInterface> = [];

  constructor(private popupService: NgbModal,
              private dashboardService: DashboardService,
              private widgetService: WidgetService) {}

  ngOnInit() {
    this.loadWidgets();
  }

  loadWidgets() {
    this.dashboardService.retrieveAll().subscribe(
      dashboards => {
        this.dashboardList = <DashboardInterface[]>dashboards['results'];
        this.widgetService.retrieveAll().subscribe(
          widgets => {
            this.widgetList = WidgetMatrixService.parseWidgets(<WidgetInterface[]>widgets['results']);
            this.widgetListEdit  = JSON.parse(JSON.stringify(this.widgetList));
          },
          err => {
            console.log(err);
            this.alerts.push(SERVER_ERROR_ALERT);
          }
        );
      },
      err => {
        console.log(err);
        this.alerts.push(SERVER_ERROR_ALERT);
      }
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
    popup.componentInstance.currentAppList = this.widgetListEdit;
  }

  cancelEdit() {
    this.widgetListEdit  = JSON.parse(JSON.stringify(this.widgetList));
    this.setState('normal');
  }

  saveEdit() {
    for (let row = 0; row < this.widgetListEdit.length; row ++) {
      for (let col = 0; col < this.widgetListEdit[row].length; col ++) {
        console.log(this.widgetListEdit[row][col]);
        this.widgetListEdit[row][col].position_x = col;
        this.widgetListEdit[row][col].position_y = row;
        this.widgetService.edit(this.widgetListEdit[row][col].id, this.widgetListEdit[row][col]).subscribe(
          data => console.log(data),
          err => console.log(err)
        );
      }
    }
    this.loadWidgets();
    this.setState('normal');
  }

  public closeAlert(alert: AlertInterface) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
