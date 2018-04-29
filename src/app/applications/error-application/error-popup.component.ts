import {Component} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'error-popup',
  templateUrl: './error-popup.component.html',
})
export class ErrorPopupComponent {
  constructor(public activeModal: NgbActiveModal) {}
}

MAPPINGS['error-popup'] = ErrorPopupComponent;
