import {Component} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PopupBaseComponent} from '../../components/main.components/popup-base.component';

/**
 * Popup component for Translate application
 */

@Component({
  selector: 'translate-popup',
  templateUrl: './translate-popup.component.html',
})
export class TranslatePopupComponent extends PopupBaseComponent {
  constructor(public activeModal: NgbActiveModal) {
    super();
  }
}

MAPPINGS['translate-popup'] = TranslatePopupComponent;

