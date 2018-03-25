import {Component, Input} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';

@Component({
  selector: 'error-application',
  templateUrl: './error-application.component.html',
})

export class ErrorApplicationComponent {
  @Input() state;
}
MAPPINGS['error-application'] = ErrorApplicationComponent;
