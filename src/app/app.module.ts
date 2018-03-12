import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppComponent } from './components/app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OAuthModule } from 'angular-oauth2-oidc';
import { RouterModule } from '@angular/router';
import { GlobalErrorHandler } from './global.error.handler';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AccountService } from './services/account.service';
import { ApplicationService } from './services/application.service';
import { WidgetService } from './services/widget.service';
import { DashboardService } from './services/dashboard.service';

import { RegistrationFormComponent } from './components/registration-form.component';
import { LoginFormComponent } from './components/login-form.component';
import { HomeComponent } from './components/home.component';
import { AuthComponent } from './components/auth.component';
import { CustomNotificationComponent } from './components/custom-notification.component';
import { MenuComponent } from './components/menu.component';
import { DashboardComponent } from './components/dashboard.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {AboutPopupContent, SettingsPopupContent} from './components/popup.component';
import { ProfileContent } from './components/profile-content.component';
import { WidgetsContent } from './components/widgets-content.component';
import { AccountsContent } from './components/accounts-content.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    CustomNotificationComponent,
    MenuComponent,
    DashboardComponent,
    SettingsPopupContent, AboutPopupContent, ProfileContent, WidgetsContent, AccountsContent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, // Http communication module
    OAuthModule.forRoot(), // OAuth2 client

    // Routing
    RouterModule.forRoot([
      { path: '', component: AuthComponent },
      { path: 'home', component: HomeComponent,
        children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full'},
          { path: 'profile', component: ProfileContent, outlet: 'settings' },
        ]},
      { path: 'login', component: LoginFormComponent },
      { path: 'register', component: RegistrationFormComponent },
      { path: 'profile', component: ProfileContent },
      ]),

    // Bootstrap
    NgbModule.forRoot(),

    // AngularBootstrap
    MDBBootstrapModule.forRoot(),
  ],
  providers: [
    AuthService, AccountService, ApplicationService, WidgetService, DashboardService, UserService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    CustomNotificationComponent
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ SettingsPopupContent, AboutPopupContent ],
})

export class AppModule {}
