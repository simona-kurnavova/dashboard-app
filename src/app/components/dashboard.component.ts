import { Component } from '@angular/core';

@Component({
  selector: 'dashboard',
  providers: [ ],
  templateUrl: './templates/dashboard.component.html'
})

export class DashboardComponent {
  public mode: string = 'normal';
  constructor() {}

  editMode(): Boolean {
    return this.mode === 'edit';
  }

  addWidget() {
    // TODO
  }

  cancelEditMode() {
    this.mode = 'normal';
  }

  saveEdit() {
    // TODO: save changes
    this.cancelEditMode();
  }
}
