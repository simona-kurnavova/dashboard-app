import {Component} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {ApplicationBaseComponent} from '../application-base.component';

@Component({
  selector: 'error-application',
  templateUrl: './error-application.component.html',
})

export class ErrorApplicationComponent extends ApplicationBaseComponent {}
MAPPINGS['error-application'] = ErrorApplicationComponent;
