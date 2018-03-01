import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from './auth.service';
import { BACKEND } from '../settings';

export interface DashboardInterface {
  owner: Number;
}

// TODO: Error handling

@Injectable()
export class DashboardService {
  url = BACKEND + 'dashboards/';

  constructor(private authService: AuthService, private http: HttpClient) {}

  retrieve(id: Number) {
    this.http.get<DashboardInterface>(
      this.url + id, { headers: this.authService.getHeaders() })
      .subscribe(data => {
        return data;
      });
  }

  retrieveAll() {
    this.http.get(this.url, { headers: this.authService.getHeaders() })
      .subscribe(
        data  => {
          return <DashboardInterface[]>data['results'];
        });
  }

  create(dashboard: DashboardInterface) {
    this.http.post<DashboardInterface>(this.url, {}, {headers: this.authService.getHeaders()})
      .subscribe(data => {
        return data;
      });
  }

  edit(id: Number, dashboard: DashboardInterface) {
    this.http.put<DashboardInterface>(this.url + id + '/', {}, {headers: this.authService.getHeaders()})
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

