import { Component } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

// @Input() name; - in content
// modalRef.componentInstance.name = 'World'; - in trigger

@Component({
  selector: 'settings-content',
  templateUrl: './templates/settings-popup-content.html',
})
export class SettingsPopupContent {
  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'about-content',
  templateUrl: './templates/about-popup-content.html',
})
export class AboutPopupContent {
  constructor(public activeModal: NgbActiveModal) {}
}
