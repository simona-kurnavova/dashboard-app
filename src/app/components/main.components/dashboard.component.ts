import { Component } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddWidgetContent} from '../popup.components/add-widget-content.component';
import {DashboardInterface, DashboardService} from '../../services/dashboard.service';
import {WidgetInterface, WidgetService} from '../../services/widget.service';

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

  constructor(private popupService: NgbModal,
              private dashboardService: DashboardService,
              private widgetService: WidgetService) {}

  ngOnInit() {
    // TODO: error handling
   this.dashboardService.retrieveAll().subscribe(
     dashboards => {
        this.dashboardList = <DashboardInterface[]>dashboards['results'];
        this.widgetService.retrieveAll().subscribe(
          widgets => {
            this.parseWidgets(<WidgetInterface[]>widgets['results']);
          },
          err => console.log(err)
        );
     },
     err => console.log(err)
   );
  }

  parseWidgets(widgets: WidgetInterface[]) {
    this.widgetList = [];
    let widgetRow = [];
    let currentRow = 0;

    for (let i = 0; i < widgets.length; i++) {
      if (widgets[i].position_y === currentRow) {
        widgetRow.push(widgets[i]);
      } else {
        this.widgetList.push(widgetRow);
        widgetRow = [];
        currentRow++;
        widgetRow.push(widgets[i]);
      }
    }
    this.widgetList.push(widgetRow);
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
