import {Component} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PopupBaseComponent} from '../../components/main.components/popup-base.component';

/**
 * Popup error component
 */
@Component({
  selector: 'error-popup',
  templateUrl: './error-popup.component.html',
})
export class ErrorPopupComponent extends PopupBaseComponent {
  constructor(public activeModal: NgbActiveModal) {
    super();
  }
}

MAPPINGS['error-popup'] = ErrorPopupComponent;
