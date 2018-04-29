import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Component} from '@angular/core';

/**
 * Component representing contents of Bootstrap modal window
 * About section - basic information about the application
 */
@Component({
  selector: 'about-content',
  templateUrl: './templates/about-content.html',
})
export class AboutContent {
  constructor(public activeModal: NgbActiveModal) {}
}
