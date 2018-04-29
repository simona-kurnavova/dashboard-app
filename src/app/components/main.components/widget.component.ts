import {Component, Input} from '@angular/core';
import {WidgetInterface, WidgetService} from '../../services/widget.service';

/**
 * Overlay classes for the edit mode of dashboard
 */
const WIDGET_OVERLAY = 'view overlay hm-indigo-light';

/**
 * Widget component for storing applications on dashboard and managing widget parameters
 */
@Component({
  selector: 'widget',
  templateUrl: './templates/widget.component.html',
})

export class WidgetComponent {
  /**
   * State of the dashboard handed from dashboard
   */
  @Input() state: String;
  /**
   * Widget specifications
   */
  @Input() widget: WidgetInterface = {
    dashboard: null,
    app: null,
    position_x: null,
    position_y: null,
    size_x: null,
    size_y: null,
    deleted: false
  };

  /**
   * Returns true if given string represents current state of dashboard
   */
  isState(state: String) {
    return this.state === state;
  }

  /**
   * Sets widget overlay classes in edit mode
   */
  setOverlay() {
    if (this.isState('edit')) {
      return WIDGET_OVERLAY;
    }
  }

  /**
   * Sets widget as deleted when tapping delete in controls of widget
   */
  deleteWidget() {
    this.widget.deleted = true;
  }

  /**
   * Changes size of the widget
   */
  changeSize(x: Number, y: Number) {
    this.widget.size_x = x;
    this.widget.size_y = y;
  }
}





