import { Component } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

// @Input() name; - in content
// modalRef.componentInstance.name = 'World'; - in trigger

@Component({
  selector: 'settings-content',
  templateUrl: './templates/settings-popup-content.html',
})
export class SettingsPopupContent {
  public activeCard: String = 'none';
  constructor(public activeModal: NgbActiveModal) {}
  isActive(card: String) {
    return this.activeCard === card;
  }
  setActive(card: String) {
    this.activeCard = card;
  }
}

@Component({
  selector: 'about-content',
  templateUrl: './templates/about-popup-content.html',
})
export class AboutPopupContent {
  constructor(public activeModal: NgbActiveModal) {}
}
