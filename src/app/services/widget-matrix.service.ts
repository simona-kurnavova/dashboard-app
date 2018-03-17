import { Injectable } from '@angular/core';
import {WidgetInterface} from './widget.service';

@Injectable()
export class WidgetMatrixService {

  static parseWidgets(widgets: WidgetInterface[]) {
    let widgetList: WidgetInterface[][] = [];
    let widgetRow = [];
    let currentRow = 0;

    for (let i = 0; i < widgets.length; i++) {
      if (widgets[i].position_y === currentRow) {
        widgetRow.push(widgets[i]);
      } else {
        widgetList.push(widgetRow);
        widgetRow = [];
        currentRow++;
        widgetRow.push(widgets[i]);
      }
    }
    widgetList.push(widgetRow);
    return widgetList;
  }

  static getFreeRow(widgets: WidgetInterface[]) {
    return this.parseWidgets(widgets).length;
  }

  static createWidget(app: Number, account: Number, dashboard: Number, widgets) {
    const widget: WidgetInterface = {
      id: null, app: app, account: account, dashboard: dashboard,
      position_x: 0, position_y: this.getFreeRow(widgets),
      size_x: 4, size_y: 4
    };
    return widget;
  }
}
