import {Component, Input} from '@angular/core';
import {WidgetInterface, WidgetService} from '../../services/widget.service';
import {Router} from '@angular/router';
import {ApplicationService} from '../../services/application.service';

const WIDGET_OVERLAY = 'view overlay hm-indigo-light';

@Component({
  selector: 'widget',
  templateUrl: './templates/widget.component.html',
})

export class WidgetComponent {
  @Input() state: String;
  @Input() widget: WidgetInterface;

  constructor(private widgetService: WidgetService,
              private router: Router,
              private applicationService: ApplicationService) {}

  isState(state: String) {
    return this.state === state;
  }

  setOverlay() {
    if (this.isState('edit')) {
      return WIDGET_OVERLAY;
    }
  }

  deleteWidget() {
    this.widgetService.delete(this.widget.id).subscribe(
      data => console.log(data),
      err => console.log(err)
    );
    this.router.navigate(['/']);
  }

  changeSize(x: Number, y: Number) {
    this.widget.size_x = x;
    this.widget.size_y = y;
  }
}





