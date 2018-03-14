import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsContent } from '../popup.components/settings-content.component';
import { AboutContent } from '../popup.components/about-content.component';
import {AddWidgetContent} from '../popup.components/add-widget-content.component';

@Component({
  selector: 'menu',
  templateUrl: './templates/menu.component.html',
})

export class MenuComponent {
  // TODO: get username from UserService
  public username = 'Username';
  constructor(private authService: AuthService, public popupService: NgbModal) {}

  logout() {
    this.authService.logout();
  }

  openSettings() {
    this.openProfile();
  }

  openProfile() {
    const popup = this.popupService.open(SettingsContent, { size: 'lg', });
    popup.componentInstance.activeCard = 'profile';
  }

  openAbout() {
    this.popupService.open(AboutContent);
  }

  openAddWidget() {
    const popup = this.popupService.open(AddWidgetContent);
  }

  openAddAccount() {
    const popup = this.popupService.open(SettingsContent, { size: 'lg' });
    popup.componentInstance.activeCard = 'accounts';
  }
}
