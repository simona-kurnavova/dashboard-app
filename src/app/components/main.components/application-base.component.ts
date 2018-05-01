import {Component, Input} from '@angular/core';

/**
 *  Base component for all the applications
 */
@Component({
  selector: 'application-base',
  template: ``
})

export class ApplicationBaseComponent {
  /**
   * State of the dashboard: edit or normal
   */
  @Input() state;

  /**
   * Widget object
   */
  @Input() widget;
}
