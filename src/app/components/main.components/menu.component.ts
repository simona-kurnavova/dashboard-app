import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SettingsContent} from '../popup.components/settings-content.component';
import {AboutContent} from '../popup.components/about-content.component';
import {UserInterface, UserService} from '../../services/user.service';

@Component({
  selector: 'menu',
  templateUrl: './templates/menu.component.html',
})

export class MenuComponent implements OnInit {
  public username: String;

  constructor(public popupService: NgbModal,
              private authService: AuthService,
              private userService: UserService) {}

  ngOnInit() {
    this.userService.retrieve().subscribe(
      data => {
        this.username = (<UserInterface[]>data['results'])[0].username;
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
}
