import {Component, Input} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';

@Component({
  selector: 'calendar-application',
  templateUrl: './calendar-application.component.html',
})

export class CalendarApplicationComponent {
  @Input() state;
}

MAPPINGS['calendar-application'] = CalendarApplicationComponent;
