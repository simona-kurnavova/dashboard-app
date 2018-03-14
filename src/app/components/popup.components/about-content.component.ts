import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Component} from '@angular/core';

@Component({
  selector: 'about-content',
  templateUrl: './templates/about-content.html',
})
export class AboutContent {
  constructor(public activeModal: NgbActiveModal) {}
}
