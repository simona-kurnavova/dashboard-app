import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/app.component/app.component';
import { HttpClientModule } from '@angular/common/http';

import { AccountService } from './services/account.service/account.service';
import { ApplicationService } from './services/application.service/application.service';
import { WidgetService } from './services/widget.service/widget.service';
import { DashboardService } from './services/dashboard.service/dashboard.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HomeComponent } from './components/home.component/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Http communication module
    OAuthModule.forRoot(), // OAuth2 client
  ],
  providers: [
    AccountService,
    ApplicationService,
    WidgetService,
    DashboardService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
