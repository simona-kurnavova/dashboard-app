import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/main.components/app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OAuthModule } from 'angular-oauth2-oidc';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AccountService } from './services/account.service';
import { ApplicationService } from './services/application.service';
import { WidgetService } from './services/widget.service';
import { DashboardService } from './services/dashboard.service';
import { RegistrationFormComponent } from './components/authentication.components/registration-form.component';
import { LoginFormComponent } from './components/authentication.components/login-form.component';
import { HomeComponent } from './components/main.components/home.component';
import { AuthComponent } from './components/authentication.components/auth.component';
import { MenuComponent } from './components/main.components/menu.component';
import { DashboardComponent } from './components/main.components/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AboutContent } from './components/popup.components/about-content.component';
import { SettingsContent } from './components/popup.components/settings-content.component';
import { ProfileContent } from './components/popup.components/profile-content.component';
import { WidgetsContent } from './components/popup.components/widgets-content.component';
import { AccountsContent } from './components/popup.components/accounts-content.component';
import { AddWidgetContent } from './components/popup.components/add-widget-content.component';
import {WidgetComponent} from './components/main.components/widget.component';
import {WidgetMatrixService} from './services/widget-matrix.service';
import {DndModule} from 'ng2-dnd';
import {ApplicationComponent} from './components/main.components/application.component';
import {ErrorApplicationComponent} from './applications/error-application/error-application.component';
import {CalendarApplicationComponent} from './applications/calendar-application/calendar-application.component';
import {CalendarAddAccountComponent} from './applications/calendar-application/calendar-add-account.component';
import {CalendarPopupComponent} from './applications/calendar-application/calendar-popup.component';
import { CalendarModule } from 'angular-calendar';
import {CalendarApplicationService} from './applications/calendar-application/calendar-application.service';
import {ApplicationBaseComponent} from './applications/application-base.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, AuthComponent, RegistrationFormComponent, LoginFormComponent, MenuComponent,
    DashboardComponent, WidgetComponent, SettingsContent, AboutContent, ProfileContent, WidgetsContent,
    AccountsContent, AddWidgetContent, ApplicationComponent, CalendarApplicationComponent, ErrorApplicationComponent,
    CalendarAddAccountComponent, CalendarPopupComponent, ApplicationBaseComponent
  ],

  imports: [
    BrowserModule, FormsModule, HttpClientModule, OAuthModule.forRoot(), DndModule.forRoot(), NgbModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,

    RouterModule.forRoot([
      { path: '', component: AuthComponent },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginFormComponent },
      { path: 'register', component: RegistrationFormComponent },
      ]),
    CalendarModule.forRoot()
  ],
  providers: [
    AuthService, AccountService, ApplicationService, WidgetService, DashboardService, UserService,
    WidgetMatrixService, CalendarApplicationService
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ SettingsContent, AboutContent, AddWidgetContent, ErrorApplicationComponent,
    CalendarApplicationComponent, CalendarAddAccountComponent, CalendarPopupComponent, ApplicationBaseComponent
  ],
})
export class AppModule {}
