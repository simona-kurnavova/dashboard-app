import {Component, Input} from '@angular/core';

/**
 *  Base component for all the popups of applications
 */
@Component({
  selector: 'popup-base',
  template: ``
})

export class PopupBaseComponent {
  /**
   * Widget object
   */
  @Input() widget;
}

