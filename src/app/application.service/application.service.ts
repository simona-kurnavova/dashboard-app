import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export interface ApplicationInterface {
  name: String;
  description: String;
  required_account: String;
}

@Injectable()
export class ApplicationService {
  url = 'http://127.0.0.1:8000/apps/';

  constructor(private http: HttpClient) {}

  retrieve(id: Number) {
    this.http.get<ApplicationInterface>(this.url + id).subscribe(data => {
      console.log(data);
      return data;
    });
  }

  retrieveAll(): Observable<ApplicationInterface[]> {
      this.http.get(this.url).subscribe(
      data  => {
        console.log(data);
        let apps = <ApplicationInterface[]>data['results'];
        for (let app of apps) {
          console.log(app);
        }
        return apps;
      });
    return null;
  }

  create(account: ApplicationInterface) {
    this.http.post(this.url, {
      'name': account.name, 'description': account.description, 'required_account': account.required_account,
    }).subscribe(data => {
      console.log(data);
    });
  }

  edit(id: Number, account: ApplicationInterface) {
    this.http.put(this.url + id + '/', {
      'name': account.name, 'description': account.description, 'required_account': account.required_account,
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

