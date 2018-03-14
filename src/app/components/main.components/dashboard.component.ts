import { Component } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddWidgetContent} from '../popup.components/add-widget-content.component';

@Component({
  selector: 'dashboard',
  providers: [ ],
  templateUrl: './templates/dashboard.component.html'
})

export class DashboardComponent {
  public mode: string = 'normal';
  constructor(private popupService: NgbModal) {}

  editMode(): Boolean {
    return this.mode === 'edit';
  }

  addWidget() {
    this.popupService.open(AddWidgetContent);
  }

  cancelEditMode() {
    this.mode = 'normal';
  }

  saveEdit() {
    // TODO: save changes
    this.cancelEditMode();
  }
}
