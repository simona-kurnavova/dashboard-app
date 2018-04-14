import {Component, Input, OnInit} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import {ApplicationBaseComponent} from '../application-base.component';

@Component({
  selector: 'time-application',
  templateUrl: './time-application.component.html',
})

export class TimeApplicationComponent extends ApplicationBaseComponent implements OnInit {
  date = new Date();

  ngOnInit() {
    this.runClock();
  }

  runClock() {
    setInterval(() => {
      this.date = new Date();
      console.log(this.date.toLocaleTimeString());
    }, 1000);
  }
}

MAPPINGS['time-application'] = TimeApplicationComponent;
