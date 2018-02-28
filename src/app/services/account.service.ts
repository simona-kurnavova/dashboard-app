import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BACKEND} from '../app.module';
import {AuthService} from './auth.service';
import {ApplicationInterface} from './application.service';

export interface AccountInterface {
  owner: Number;
  type: String;
  name: String;
  token: String;
  info: String;
}

// TODO: Error handling

@Injectable()
export class AccountService {
  url = BACKEND + 'accounts/';

  constructor(private authService: AuthService, private http: HttpClient) {}

  retrieve(id: Number) {
    this.http.get<AccountInterface>(
      this.url + id, { headers: this.authService.getHeaders() })
      .subscribe(data => {
        return data;
      });
  }

  retrieveAll() {
    this.http.get(this.url, { headers: this.authService.getHeaders() })
      .subscribe(
        data  => {
          return <AccountInterface[]>data['results'];
        });
  }

  create(account: AccountInterface) {
    this.http.post<AccountInterface>(this.url, {
      'type': account.type, 'name': account.name, 'token': account.token, 'info': account.info,
    }, {headers: this.authService.getHeaders()})
      .subscribe(data => {
        return data;
      });
  }

  edit(id: Number, account: AccountInterface) {
    this.http.put<AccountInterface>(this.url + id + '/', {
      'type': account.type, 'name': account.name, 'token': account.token, 'info': account.info,
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

