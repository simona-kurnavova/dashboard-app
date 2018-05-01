import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

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

  constructor() {}
}

