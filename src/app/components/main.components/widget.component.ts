import {Component, Input} from '@angular/core';
import {WidgetInterface} from '../../services/widget.service';
import {ApplicationInterface, ApplicationService} from '../../services/application.service';
import {forEach} from '@angular/router/src/utils/collection';

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
    deleted: false,
  };

  /**
   * Application of the widget
   */
  public application: ApplicationInterface = {
    name: null,
    allows_small_sizes: true,
  };

  /**
   * Retrieves widget application for the size data
   */
  constructor(private applicationService: ApplicationService) {
    this.application = null;
    this.applicationService.retrieveAll().subscribe(
      data => {
        const apps = <ApplicationInterface[]>data['results'];
        for (let i = 0; i < apps.length; i++) {
          if (apps[i].id === this.widget.app) {
            this.application = apps[i];
            break;
          }
        }
      }
    );
  }

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
    if (y < 450 && !this.allowsSmallSizes()) {
      return;
    }
    this.widget.size_x = x;
    this.widget.size_y = y;
  }

  allowsSmallSizes() {
    if (this.application) {
      return this.application.allows_small_sizes;
    }
    return true;
  }
}





