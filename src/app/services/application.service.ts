import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BACKEND } from '../app.module';

export interface ApplicationInterface {
  name: String;
  description: String;
  required_account: String;
}

// TODO: Error handling

@Injectable()
export class ApplicationService {
  url = BACKEND + 'apps/';

  constructor(private authService: AuthService, private http: HttpClient) {}

  retrieve(id: Number) {
    this.http.get<ApplicationInterface>(
      this.url + id, { headers: this.authService.getHeaders() })
      .subscribe(data => {
      return data;
    });
  }

  retrieveAll() {
    this.http.get(this.url, { headers: this.authService.getHeaders() })
      .subscribe(
      data  => {
        return <ApplicationInterface[]>data['results'];
      });
  }

  // TODO: handle error: name: ["app with this name already exists."], "POST /apps/ HTTP/1.1" 400 47
  create(app: ApplicationInterface) {
    this.http.post<ApplicationInterface>(this.url, {
      'name': app.name, 'description': app.description, 'required_account': app.required_account
    }, {headers: this.authService.getHeaders()})
      .subscribe(data => {
      return data;
    });
  }

  edit(id: Number, account: ApplicationInterface) {
    this.http.put<ApplicationInterface>(this.url + id + '/', {
      'name': account.name, 'description': account.description, 'required_account': account.required_account,
    }, {headers: this.authService.getHeaders()})
      .subscribe(data => {
      return data;
    });
  }

  delete(id: Number) {
    this.http.delete(this.url + id + '/', { headers: this.authService.getHeaders() }).subscribe(data => {
      return data;
    });
  }
}

