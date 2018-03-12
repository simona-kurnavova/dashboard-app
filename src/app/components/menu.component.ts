import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AboutPopupContent, SettingsPopupContent} from './popup.component';

@Component({
  selector: 'menu',
  templateUrl: './templates/menu.component.html',
})

export class MenuComponent {
  public username = 'Username';
  constructor(private authService: AuthService, public popupService: NgbModal) {}

  logout() {
    this.authService.logout();
  }

  openSettings() {
    this.popupService.open(SettingsPopupContent);
  }

  openProfile() {
    // TODO
  }

  openAbout() {
    this.popupService.open(AboutPopupContent);
  }

  openAddWidget() {
    // TODO
  }

  openAddAccount() {
    // TODO
  }
}
