import { Component } from '@angular/core';
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
    // TODO: error handling
   this.dashboardService.retrieveAll().subscribe(
     dashboards => {
        this.dashboardList = <DashboardInterface[]>dashboards['results'];
        this.widgetService.retrieveAll().subscribe(
          widgets => {
            this.widgetList = WidgetMatrixService.parseWidgets(<WidgetInterface[]>widgets['results']);
            this.widgetListEdit = WidgetMatrixService.parseWidgetsEdit(this.widgetList, this.dashboardList[0].id);
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

  saveEdit() {
    // TODO: save changes
    this.setState('normal');
  }
}
