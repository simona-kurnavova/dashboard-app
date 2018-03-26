import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddWidgetContent} from '../popup.components/add-widget-content.component';
import {DashboardInterface, DashboardService} from '../../services/dashboard.service';
import {WidgetInterface, WidgetService} from '../../services/widget.service';
import {WidgetMatrixService} from '../../services/widget-matrix.service';

@Component({
  selector: 'dashboard',
  providers: [ ],
  templateUrl: './templates/dashboard.component.html'
})

export class DashboardComponent {
  public state: String = 'normal';
  public widgetJustify = 'center';
  public dashboardList: DashboardInterface[];
  public widgetList: WidgetInterface[][];
  public widgetListEdit: WidgetInterface[][];

  constructor(private popupService: NgbModal,
              private dashboardService: DashboardService,
              private widgetService: WidgetService) {
    this.ngOnInit();
  }

  ngOnInit() {
    this.loadWidgets();
  }

  loadWidgets() {
    // TODO: error handling
    this.dashboardService.retrieveAll().subscribe(
      dashboards => {
        this.dashboardList = <DashboardInterface[]>dashboards['results'];
        this.widgetService.retrieveAll().subscribe(
          widgets => {
            this.widgetList = WidgetMatrixService.parseWidgets(<WidgetInterface[]>widgets['results']);
            this.widgetListEdit  = JSON.parse(JSON.stringify(this.widgetList));
          },
          err => console.log(err)
        );
      },
      err => console.log(err)
    );
  }

  isState(state: String) {
    return this.state === state;
  }

  setState(state: String) {
    this.state = state;
  }

  addWidget() {
    this.popupService.open(AddWidgetContent);
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
}
