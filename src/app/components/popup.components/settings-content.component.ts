import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'settings-content',
  templateUrl: './templates/settings-content.html',
})
export class SettingsContent {
  @Input() activeCard: String = 'none';

  constructor(public activeModal: NgbActiveModal) {}

  setActive(card: String) {
    this.activeCard = card;
  }
}
