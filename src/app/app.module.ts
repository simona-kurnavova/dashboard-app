import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppComponent } from './components/main.components/app.component';
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

@NgModule({
  declarations: [
    AppComponent, HomeComponent, AuthComponent, RegistrationFormComponent,
    LoginFormComponent, MenuComponent, DashboardComponent,
    SettingsContent, AboutContent, ProfileContent, WidgetsContent, AccountsContent, AddWidgetContent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, // Http communication module
    OAuthModule.forRoot(), // OAuth2 client

    // Routing
    RouterModule.forRoot([
      { path: '', component: AuthComponent },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginFormComponent },
      { path: 'register', component: RegistrationFormComponent },
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
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ SettingsContent, AboutContent, AddWidgetContent ],
})

export class AppModule {}
