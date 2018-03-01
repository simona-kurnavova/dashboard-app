import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AccountService } from './services/account.service';
import { ApplicationService } from './services/application.service';
import { WidgetService } from './services/widget.service';
import { DashboardService } from './services/dashboard.service';

import { HomeComponent } from './components/home.component';
import { AuthComponent } from './components/auth.component';
import { AuthService } from './services/auth.service';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {RegistrationFormComponent} from './components/registration-form.component';
import { LoginFormComponent } from './components/login-form.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    RegistrationFormComponent,
    LoginFormComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, // Http communication module
    OAuthModule.forRoot(), // OAuth2 client
    // Material components
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: AuthComponent },
      { path: 'register', component: RegistrationFormComponent },
      ]),
  ],
  providers: [
    AuthService,
    AccountService,
    ApplicationService,
    WidgetService,
    DashboardService,
    UserService,
  ],
  bootstrap: [ AppComponent ],
})

export class AppModule {}
