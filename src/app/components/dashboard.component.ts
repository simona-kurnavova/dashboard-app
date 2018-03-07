import { Component } from '@angular/core';

@Component({
  selector: 'dashboard',
  providers: [ ],
  templateUrl: './templates/dashboard.component.html'
})

export class DashboardComponent {
  public mode: string = 'normal';
  constructor() {}
}
