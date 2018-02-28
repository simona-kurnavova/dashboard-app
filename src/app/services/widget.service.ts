import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BACKEND } from '../app.module';

export interface WidgetInterface {
  dashboard: Number;
  app: Number;
  account: Number;
  position_x: Number;
  position_y: Number;
}

// TODO: Error handling

@Injectable()
export class WidgetService {
  url = BACKEND + 'widgets/';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  retrieve(id: Number) {
    this.http.get<WidgetInterface>(
      this.url + id, { headers: this.authService.getHeaders() })
      .subscribe(data => {
        return data;
      });
  }

  retrieveAll() {
    this.http.get(this.url, { headers: this.authService.getHeaders() })
      .subscribe(
        data  => {
          return <WidgetInterface[]>data['results'];
        });
  }

  create(widget: WidgetInterface) {
    this.http.post<WidgetInterface>(this.url, {
      'dashboard': widget.dashboard,
      'app': widget.app,
      'account': widget.account,
      'position_x': widget.position_x,
      'position_y': widget.position_y
    }, {headers: this.authService.getHeaders()})
      .subscribe(data => {
        return data;
      });
  }

  edit(id: Number, widget: WidgetInterface) {
    this.http.put<WidgetInterface>(this.url + id + '/', {
      'dashboard': widget.dashboard,
      'app': widget.app,
      'account': widget.account,
      'position_x': widget.position_x,
      'position_y': widget.position_y
    }, {headers: this.authService.getHeaders()})
      .subscribe(data => {
        return data;
      });
  }

  delete(id: Number) {
    this.http.delete(this.url + id + '/', {headers: this.authService.getHeaders()}).subscribe(data => {
      return data;
    });
  }

}
