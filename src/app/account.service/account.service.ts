import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export interface AccountInterface {
  owner: Number;
  type: String;
  name: String;
  token: String;
  info: String;
}

@Injectable()
export class AccountService {
  url = 'http://127.0.0.1:8000/accounts/';

  constructor(private http: HttpClient) {}

  retrieve(id: Number) {
    this.http.get<AccountInterface>(this.url + id).subscribe(data => {
      console.log(data.name);
      return data;
    });
  }

  retrieveAll(): Observable<AccountInterface[]> {
    this.http.get(this.url).subscribe(
      data  => {
        console.log(data);
        let accounts = <AccountInterface[]>data['results'];
        for (let account of accounts) {
          console.log(account);
        }
        return accounts;
      });
    return null;
  }

  create(account: AccountInterface) {
    this.http.post(this.url, {
      'owner': account.owner, 'type': account.type, 'name': account.name, 'token': account.token, 'info': account.info,
    }).subscribe(data => {
      console.log(data);
      // TODO: test after auth and permissions set
    });
  }

  edit(id: Number, account: AccountInterface){
    this.http.put(this.url + id + '/', {
      'owner': account.owner, 'type': account.type, 'name': account.name, 'token': account.token, 'info': account.info,
    }).subscribe(data => {
      console.log(data);
      // TODO: test after auth and permissions set
    });
  }

  delete(id: Number) {
    this.http.delete(this.url + id + '/').subscribe(data => {
      console.log(data);
    });
  }

}

