import {Component} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {ApplicationBaseComponent} from '../../components/main.components/application-base.component';

/**
 * Error application component used when there is error loading application
 */
@Component({
  selector: 'error-application',
  templateUrl: './error-application.component.html',
})

export class ErrorApplicationComponent extends ApplicationBaseComponent {}
MAPPINGS['error-application'] = ErrorApplicationComponent;


