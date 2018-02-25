import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DashboardInterface} from '../dashboard.service/dashboard.service';
import {Observable} from 'rxjs/Observable';

export interface WidgetInterface {
  dashboard: Number;
  app: Number;
  account: Number;
  position_x: Number;
  position_y: Number;
}

@Injectable()
export class WidgetService {
  url = 'http://127.0.0.1:8000/widgets/';

  constructor(private http: HttpClient) {}

  retrieve(id: Number) {
    this.http.get<WidgetInterface>(this.url + id).subscribe(data => {
      console.log(data);
      return data;
    });
  }

  retrieveAll(): Observable<WidgetInterface[]> {
    this.http.get(this.url).subscribe(
      data  => {
        console.log(data);
        let widgets = <WidgetInterface[]>data['results'];
        for (let widget of widgets) {
          console.log(widget);
        }
        return widgets;
      });
    return null;
  }

  create(widget: WidgetInterface) {
    this.http.post(this.url, {
      'app': widget.app, 'account': widget.account, 'position_x': widget.position_x, 'position_y': widget.position_y, 'dashboard': widget.dashboard,
    }).subscribe(data => {
      console.log(data);
    });
  }

  edit(id: Number, widget: WidgetInterface) {
    this.http.put(this.url + id + '/', {
      'app': widget.app, 'account': widget.account, 'position_x': widget.position_x, 'position_y': widget.position_y, 'dashboard': widget.dashboard,
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
