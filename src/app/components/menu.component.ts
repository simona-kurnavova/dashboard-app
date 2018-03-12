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
    this.openProfile();
  }

  openProfile() {
    const popup = this.popupService.open(SettingsPopupContent, { size: 'lg' });
    popup.componentInstance.activeCard = 'profile';
  }

  openAbout() {
    this.popupService.open(AboutPopupContent);
  }

  openAddWidget() {
    const popup = this.popupService.open(SettingsPopupContent, { size: 'lg' });
    popup.componentInstance.activeCard = 'widgets';
  }

  openAddAccount() {
    const popup = this.popupService.open(SettingsPopupContent, { size: 'lg' });
    popup.componentInstance.activeCard = 'accounts';
  }
}
