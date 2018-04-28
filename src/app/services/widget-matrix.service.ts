import {Injectable} from '@angular/core';
import {WidgetInterface} from './widget.service';
import {DEFAULT_WIDGET_HEIGHT, DEFAULT_WIDGET_WIDTH} from '../settings';

@Injectable()
export class WidgetMatrixService {

  static parseWidgets(w: WidgetInterface[]) {
    const widgets = w;
    let widgetList: WidgetInterface[][] = [];
    let widgetRow = [];
    let currentRow = 0;

    for (let i = 0; i < widgets.length; i++) {
      widgets[i].deleted = false;
      if (widgets[i].position_y === currentRow) {
        widgetRow.splice(widgets[i].position_x, 0, widgets[i]);
      } else {
        widgetList.push(widgetRow);
        widgetRow = [];
        currentRow++;
        widgetRow.splice(widgets[i].position_x, 0, widgets[i]);
      }
    }
    widgetList.push(widgetRow);
    return widgetList;
  }

  static getFreeRow(widgets: WidgetInterface[]) {
    return this.parseWidgets(widgets).length;
  }

  static createWidget(app: Number, account: Number, dashboard: Number, widgets) {
    return <WidgetInterface>{
      app: app, account: account, dashboard: dashboard,
      position_x: 0, position_y: this.getFreeRow(widgets),
      size_x: DEFAULT_WIDGET_WIDTH, size_y: DEFAULT_WIDGET_HEIGHT,
    };
  }
}
