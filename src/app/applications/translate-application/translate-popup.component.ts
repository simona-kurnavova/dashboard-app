import {Component} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'translate-popup',
  templateUrl: './translate-popup.component.html',
})
export class TranslatePopupComponent {
  constructor(public activeModal: NgbActiveModal) {}
}

MAPPINGS['translate-popup'] = TranslatePopupComponent;
