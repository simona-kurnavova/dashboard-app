import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './components/main.components/app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {OAuthModule} from 'angular-oauth2-oidc';
import {RouterModule} from '@angular/router';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';
import {AccountService} from './services/account.service';
import {ApplicationService} from './services/application.service';
import {WidgetService} from './services/widget.service';
import {DashboardService} from './services/dashboard.service';
import {RegistrationFormComponent} from './components/authentication.components/registration-form.component';
import {LoginFormComponent} from './components/authentication.components/login-form.component';
import {HomeComponent} from './components/main.components/home.component';
import {AuthComponent} from './components/authentication.components/auth.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {WidgetMatrixService} from './services/widget-matrix.service';
import {DndModule} from 'ng2-dnd';
import {CalendarModule} from 'angular-calendar';
import {OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgSelectModule} from '@ng-select/ng-select';
import {DashboardComponent} from './components/main.components/dashboard.component';
import {AboutContent} from './components/popup.components/about-content.component';
import {WidgetComponent} from './components/main.components/widget.component';
import {SettingsContent} from './components/popup.components/settings-content.component';
import {ApplicationComponent} from './components/main.components/application.component';
import {WidgetsContent} from './components/popup.components/widgets-content.component';
import {ApplicationBaseComponent} from './applications/application-base.component';
import {AccountsContent} from './components/popup.components/accounts-content.component';
import {ProfileContent} from './components/popup.components/profile-content.component';
import {AddWidgetContent} from './components/popup.components/add-widget-content.component';
import {MenuComponent} from './components/main.components/menu.component';
import {ErrorApplicationComponent} from './applications/error-application/error-application.component';
import {CalendarApplicationComponent} from './applications/calendar-application/calendar-application.component';
import {TimeApplicationComponent} from './applications/time-application/time-application.component';
import {CalendarAddAccountComponent} from './applications/calendar-application/calendar-add-account.component';
import {OneNoteApplicationComponent} from './applications/onenote-application/onenote-application.component';
import {CalendarPopupComponent} from './applications/calendar-application/calendar-popup.component';
import {TranslateApplicationComponent} from './applications/translate-application/translate-application.component';
import {TranslatePopupComponent} from './applications/translate-application/translate-popup.component';
import {OneNotePopupComponent} from './applications/onenote-application/onenote-popup.component';
import {ErrorPopupComponent} from './applications/error-application/error-popup.component';
import {AlertComponent} from './components/alert.component';


@NgModule({
  declarations: [
    AppComponent, HomeComponent, AuthComponent, RegistrationFormComponent, LoginFormComponent, MenuComponent,
    DashboardComponent, WidgetComponent, SettingsContent, AboutContent, ProfileContent, WidgetsContent,
    AccountsContent, AddWidgetContent, ApplicationComponent,
    ApplicationBaseComponent, ErrorApplicationComponent,
    CalendarApplicationComponent, CalendarAddAccountComponent, CalendarPopupComponent,
    TimeApplicationComponent, OneNoteApplicationComponent, TranslateApplicationComponent, TranslatePopupComponent,
    OneNotePopupComponent, ErrorPopupComponent, AlertComponent
  ],

  imports: [
    BrowserModule, FormsModule, HttpClientModule, OAuthModule.forRoot(), DndModule.forRoot(), NgbModule.forRoot(),
    MDBBootstrapModule.forRoot(), OwlDateTimeModule, OwlNativeDateTimeModule, BrowserAnimationsModule,
    NgSelectModule, CalendarModule.forRoot(),

    RouterModule.forRoot([
      { path: '', component: AuthComponent },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginFormComponent },
      { path: 'register', component: RegistrationFormComponent },
      { path: '*', component: HomeComponent},
      ]),
  ],
  providers: [
    AuthService, AccountService, ApplicationService, WidgetService, DashboardService, UserService,
    WidgetMatrixService
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [
    SettingsContent, AboutContent, AddWidgetContent, ApplicationBaseComponent,
    ErrorApplicationComponent,
    CalendarApplicationComponent, CalendarAddAccountComponent, CalendarPopupComponent, OneNotePopupComponent,
    TimeApplicationComponent, OneNoteApplicationComponent, TranslateApplicationComponent, TranslatePopupComponent,
    ErrorPopupComponent
  ],
})
export class AppModule {}
