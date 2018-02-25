import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AccountService } from './account.service/account.service';
import { ApplicationService } from './application.service/application.service';
import { WidgetService } from './widget.service/widget.service';
import { DashboardService } from './dashboard.service/dashboard.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Http communication module
  ],
  providers: [AccountService, ApplicationService, WidgetService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
