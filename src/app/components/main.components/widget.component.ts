import {Component, Input} from '@angular/core';
import {WidgetInterface} from '../../services/widget.service';

const WIDGET_OVERLAY = 'view overlay hm-indigo-light';

@Component({
  selector: 'widget',
  templateUrl: './templates/widget.component.html',
})

export class WidgetComponent {
  @Input() state: String;
  @Input() widget: WidgetInterface;

  constructor() {}

  isState(state: String) {
    return this.state === state;
  }

  setOverlay() {
    if (this.isState('edit')) {
      return WIDGET_OVERLAY;
    }
  }
}
