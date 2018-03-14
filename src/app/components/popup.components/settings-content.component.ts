import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// @Input() name; - in content
// modalRef.componentInstance.name = 'World'; - in trigger

@Component({
  selector: 'settings-content',
  templateUrl: './templates/settings-content.html',
})
export class SettingsContent {
  @Input() activeCard: String = 'none';
  constructor(public activeModal: NgbActiveModal) {}
  isActive(card: String) {
    return this.activeCard === card;
  }
  setActive(card: String) {
    this.activeCard = card;
  }
}
