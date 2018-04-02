import {Component, Input} from '@angular/core';

@Component({
  selector: 'application-base',
  template: ``
})

export class ApplicationBaseComponent {
  @Input() state;
  @Input() widget;
}
