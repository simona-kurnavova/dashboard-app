import {Component} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OneNoteApplicationService} from './onenote-application.service';
import {PopupBaseComponent} from '../popup-base.component';

@Component({
  selector: 'onenote-popup',
  templateUrl: './onenote-popup.component.html',
  providers: [OneNoteApplicationService]
})
export class OneNotePopupComponent extends PopupBaseComponent {
  constructor(public activeModal: NgbActiveModal) {
    super();
  }
}

MAPPINGS['onenote-popup'] = OneNotePopupComponent;
