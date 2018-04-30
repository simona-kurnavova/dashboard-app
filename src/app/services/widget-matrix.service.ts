import {Injectable} from '@angular/core';
import {WidgetInterface} from './widget.service';
import {DEFAULT_WIDGET_HEIGHT, DEFAULT_WIDGET_WIDTH} from '../settings';

/**
 * Service for handling parsing and operations with widget matrix outside the dashboard component
 */

@Injectable()
export class WidgetMatrixService {
  /**
   * Parses widgets to array and adds deleted=false attribute
   */
  static parseWidgets(widgets: WidgetInterface[]): WidgetInterface[] {
    const widgetList: WidgetInterface[] = widgets;
    for (let i = 0; i < widgetList.length; i++) {
     widgetList[i].deleted = false;
    }
    return widgetList;
  }

  /**
   * Creates new widget according to parameters with default width and height
   */
  static createWidget(app: Number, account: Number, dashboard: Number, widgets) {
    return <WidgetInterface>{
      app: app, account: account, dashboard: dashboard,
      position_x: widgets.length, position_y: 0,
      size_x: DEFAULT_WIDGET_WIDTH, size_y: DEFAULT_WIDGET_HEIGHT,
    };
  }
}
