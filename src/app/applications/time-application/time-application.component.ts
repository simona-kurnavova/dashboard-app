import {Component, OnInit} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import {ApplicationBaseComponent} from '../application-base.component';

@Component({
  selector: 'time-application',
  templateUrl: './time-application.component.html',
})

export class TimeApplicationComponent extends ApplicationBaseComponent implements OnInit {
  public state;
  public date = new Date();

  ngOnInit() {
    this.state = 'clock';
    this.runClock();
  }

  setState(state: string) {
    this.state = state;
  }

  isState(state: string) {
    return this.state === state;
  }

  runClock() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }
}

MAPPINGS['time-application'] = TimeApplicationComponent;
