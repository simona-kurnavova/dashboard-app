import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export interface DashboardInterface {
  owner: Number;
}

@Injectable()
export class DashboardService {
  url = 'http://127.0.0.1:8000/dashboards/';

  constructor(private http: HttpClient) {}

  retrieve(id: Number) {
    this.http.get<DashboardInterface>(this.url + id).subscribe(data => {
      console.log(data);
      return data;
    });
  }

  retrieveAll(): Observable<DashboardInterface[]> {
      this.http.get(this.url).subscribe(
      data  => {
        console.log(data);
        let dashboards = <DashboardInterface[]>data['results'];
        for (let dashboard of dashboards) {
          console.log(dashboard);
        }
        return dashboards;
      });
    return null;
  }

  create(dashboard: DashboardInterface) {
    this.http.post(this.url, {
      'owner': dashboard.owner,
    }).subscribe(data => {
      console.log(data);
    });
  }

  edit(id: Number, dashboard: DashboardInterface) {
    this.http.put(this.url + id + '/', {
      'owner': dashboard.owner,
    }).subscribe(data => {
      console.log(data);
    });
  }

  delete(id: Number) {
    this.http.delete(this.url + id + '/').subscribe(data => {
      console.log(data);
    });
  }

}

