import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsContent } from '../popup.components/settings-content.component';
import { AboutContent } from '../popup.components/about-content.component';
import {AddWidgetContent} from '../popup.components/add-widget-content.component';
import {UserInterface, UserService} from '../../services/user.service';

@Component({
  selector: 'menu',
  templateUrl: './templates/menu.component.html',
})

export class MenuComponent {
  public username: String;
  public hideMenu: false;

  constructor(private authService: AuthService, public popupService: NgbModal, private userService: UserService) {}

  ngOnInit() {
    this.userService.retrieve().subscribe(
      data => {
        this.username = (<UserInterface[]>data['results'])[0].username;
        console.log(data);
      },
      err => {
        console.log(err);
        this.username = 'User';
      }
    );
  }

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
