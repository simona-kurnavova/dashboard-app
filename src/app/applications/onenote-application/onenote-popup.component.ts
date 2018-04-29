import {Component} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OneNoteApplicationService} from './onenote-application.service';

@Component({
  selector: 'onenote-popup',
  templateUrl: './onenote-popup.component.html',
  providers: [OneNoteApplicationService]
})
export class OneNotePopupComponent {
  constructor(public activeModal: NgbActiveModal) {}
}

MAPPINGS['onenote-popup'] = OneNotePopupComponent;
