import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BACKEND} from '../settings';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';

/**
 * Interface for Account object
 */
export interface AccountInterface {
  id?: number;
  owner?: Number;
  type: String;
  name: String;
  token: String;
  info?: String;
}

/**
 * Service for CRUD operations of Account objects. Every method returns Observable.
 */
@Injectable()
export class AccountService {
  url: string = BACKEND + 'accounts/';

  constructor(private authService: AuthService,
              private http: HttpClient) {}

  /**
   * Retrieves Account with given id
   */
  retrieve(id: Number): Observable<AccountInterface> {
    return this.http.get<AccountInterface>(
      this.url + id,
      { headers: this.authService.getHeaders()});
  }

  /**
   * Retrieves all Account objects owned by the logged in user
   */
  retrieveAll(): Observable<AccountInterface[]> {
    return this.http.get<AccountInterface[]>(this.url,
      { headers: this.authService.getHeaders()});
  }

  /**
   * Saves the new Account object to database with current user as owner
   */
  create(account: AccountInterface): Observable<AccountInterface> {
    return this.http.post<AccountInterface>(this.url, {
      'type': account.type, 'name': account.name, 'token': account.token, 'info': account.info,
    }, {headers: this.authService.getHeaders()});
  }

  /**
   * Partially updates existing Account object
   */
  edit(id: Number, account: AccountInterface): Observable<AccountInterface> {
    return this.http.put<AccountInterface>(this.url + id + '/', {
      'type': account.type, 'name': account.name, 'token': account.token, 'info': account.info,
    }, {headers: this.authService.getHeaders()});
  }

  /**
   * Deletes Account object with given id
   */
  delete(id: Number): Observable<AccountInterface> {
    return this.http.delete<AccountInterface>(this.url + id + '/',
      {headers: this.authService.getHeaders()});
  }

}

