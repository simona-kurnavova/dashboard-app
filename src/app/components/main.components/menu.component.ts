import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SettingsContent} from '../popup.components/settings-content.component';
import {AboutContent} from '../popup.components/about-content.component';
import {UserInterface, UserService} from '../../services/user.service';

/**
 * Menu component for homepage
 */

@Component({
  selector: 'menu',
  templateUrl: './templates/menu.component.html',
})

export class MenuComponent implements OnInit {
  /**
   * Username of logged in user
   */
  public username: String;

  constructor(public popupService: NgbModal,
              private authService: AuthService,
              private userService: UserService) {}

  /**
   * Retrieves user information about current user
   */
  ngOnInit() {
    this.userService.retrieve().subscribe(
      data => {
        this.username = (<UserInterface[]>data['results'])[0].username;
      },
      () => {
        this.username = 'User';
      }
    );
  }

  /**
   * Logs out currently logged in user and redirects to login
   */
  logout() {
    this.authService.logout();
  }

  /**
   * Opens settings modal window
   */
  openSettings() {
    this.openProfile();
  }

  /**
   * Opens settings modal window with on profile settings card
   */
  openProfile() {
    const popup = this.popupService.open(SettingsContent, { size: 'lg', });
    popup.componentInstance.activeCard = 'profile';
  }

  /**
   * Opens About section in modal window
   */
  openAbout() {
    this.popupService.open(AboutContent);
  }
}
