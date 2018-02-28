import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AccountService } from './services/account.service';
import { ApplicationService } from './services/application.service';
import { WidgetService } from './services/widget.service';
import { DashboardService } from './services/dashboard.service';

import { HomeComponent } from './components/home.component';
import {LoginComponent} from './components/login.component';
import {FooComponent} from './components/foo.component';
import {AuthService} from './services/auth.service';

// TODO: Move to separate file
export const BACKEND = 'http://127.0.0.1:8000/';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FooComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, // Http communication module
    OAuthModule.forRoot(), // OAuth2 client
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent }]),
  ],
  providers: [
    AuthService,
    AccountService,
    ApplicationService,
    WidgetService,
    DashboardService
  ],
  bootstrap: [ AppComponent ],
})


export class AppModule {
}
