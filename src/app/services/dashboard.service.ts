import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from './auth.service';
import { BACKEND } from '../settings';

export interface DashboardInterface {
  id: Number;
  owner: Number;
}

// TODO: Error handling

@Injectable()
export class DashboardService {
  url = BACKEND + 'dashboards/';

  constructor(private authService: AuthService, private http: HttpClient) {}

  retrieve(id: Number) {
    return this.http.get<DashboardInterface>(
      this.url + id, {headers: this.authService.getHeaders()});
  }

  retrieveAll() {
    return this.http.get(this.url, {headers: this.authService.getHeaders()});
  }

  create(dashboard: DashboardInterface) {
    return this.http.post<DashboardInterface>(this.url, {}, {headers: this.authService.getHeaders()});
  }

  edit(id: Number, dashboard: DashboardInterface) {
    return this.http.put<DashboardInterface>(this.url + id + '/', {}, {headers: this.authService.getHeaders()});
  }

  delete(id: Number) {
    return this.http.delete(this.url + id + '/', {headers: this.authService.getHeaders()});
  }
}
