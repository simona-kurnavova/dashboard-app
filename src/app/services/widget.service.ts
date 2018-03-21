import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BACKEND } from '../settings';

export interface WidgetInterface {
  id?: Number;
  dashboard: Number;
  app: Number;
  account?: Number;
  position_x: number;
  position_y: number;
  size_x: Number;
  size_y: Number;
}

@Injectable()
export class WidgetService {
  url = BACKEND + 'widgets/';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  retrieve(id: Number) {
    return this.http.get<WidgetInterface>(
      this.url + id.toString() + '/', {headers: this.authService.getHeaders()});
  }

  retrieveAll() {
    return this.http.get(this.url, {headers: this.authService.getHeaders()});
  }

  create(widget: WidgetInterface) {
    return this.http.post<WidgetInterface>(this.url, {
      'dashboard': widget.dashboard,
      'app': widget.app,
      'account': widget.account,
      'position_x': widget.position_x,
      'position_y': widget.position_y,
      'size_x': widget.size_x,
      'size_y': widget.size_y
    }, {headers: this.authService.getHeaders()});
  }

  edit(id: Number, widget: WidgetInterface) {
    return this.http.put<WidgetInterface>(this.url + id + '/', {
      'id': widget.id,
      'dashboard': widget.dashboard,
      'app': widget.app,
      'account': widget.account,
      'position_x': widget.position_x,
      'position_y': widget.position_y,
      'size_x': widget.size_x,
      'size_y': widget.size_y
    }, {headers: this.authService.getHeaders()});
  }

  delete(id: Number) {
    return this.http.delete(this.url + id.toString() + '/',
      {headers: this.authService.getHeaders()});
  }
}





