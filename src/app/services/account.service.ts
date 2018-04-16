import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BACKEND} from '../settings';
import {AuthService} from './auth.service';

export interface AccountInterface {
  id?: number;
  owner?: Number;
  type: String;
  name: String;
  token: String;
  info?: String;
}

@Injectable()
export class AccountService {
  url = BACKEND + 'accounts/';

  constructor(private authService: AuthService,
              private http: HttpClient) {}

  retrieve(id: Number) {
    return this.http.get<AccountInterface>(
      this.url + id, { headers: this.authService.getHeaders() });
  }

  retrieveAll() {
    return this.http.get(this.url, { headers: this.authService.getHeaders() });
  }

  create(account: AccountInterface) {
    return this.http.post<AccountInterface>(this.url, {
      'type': account.type, 'name': account.name, 'token': account.token, 'info': account.info,
    }, {headers: this.authService.getHeaders()});
  }

  edit(id: Number, account: AccountInterface) {
    return this.http.put<AccountInterface>(this.url + id + '/', {
      'type': account.type, 'name': account.name, 'token': account.token, 'info': account.info,
    }, {headers: this.authService.getHeaders()});
  }

  delete(id: Number) {
    return this.http.delete(this.url + id + '/', {headers: this.authService.getHeaders()});
  }

}

