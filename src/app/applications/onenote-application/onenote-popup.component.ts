import {Component} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OneNoteApplicationService} from './onenote-application.service';
import {PopupBaseComponent} from '../../components/main.components/popup-base.component';

/**
 * Component for popup of Microsoft OneNote
 */
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
