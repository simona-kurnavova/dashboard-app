import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

/**
 * Represents contents of Bootstrap modal window
 * Manages user settings
 */
@Component({
  selector: 'settings-content',
  templateUrl: './templates/settings-content.html',
})
export class SettingsContent {
  /**
   * Active card of the settings
   */
  @Input() activeCard: String = 'none';

  constructor(public activeModal: NgbActiveModal) {}

  /**
   * Sets active settings card
   */
  setActive(card: String) {
    this.activeCard = card;
  }
}
