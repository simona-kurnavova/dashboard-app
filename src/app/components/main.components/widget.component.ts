import {Component, Input} from '@angular/core';
import {WidgetInterface, WidgetService} from '../../services/widget.service';

const WIDGET_OVERLAY = 'view overlay hm-indigo-light';

@Component({
  selector: 'widget',
  templateUrl: './templates/widget.component.html',
})

export class WidgetComponent {
  @Input() state: String;
  @Input() widget: WidgetInterface = {
    dashboard: null,
    app: null,
    position_x: null,
    position_y: null,
    size_x: null,
    size_y: null,
    deleted: false
  };

  constructor(private widgetService: WidgetService) {}

  isState(state: String) {
    return this.state === state;
  }

  setOverlay() {
    if (this.isState('edit')) {
      return WIDGET_OVERLAY;
    }
  }

  deleteWidget() {
    this.widget.deleted = true;
  }

  changeSize(x: Number, y: Number) {
    this.widget.size_x = x;
    this.widget.size_y = y;
  }
}





