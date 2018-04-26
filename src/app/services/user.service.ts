import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {BACKEND} from '../settings';
import {Observable} from 'rxjs/Observable';

/**
 * Interface for User object
 */
export interface UserInterface {
  id?: Number;
  username: String;
  password?: String;
  email: String;
}

/**
 * Service for CRUD operations of User objects
 */
@Injectable()
export class UserService {
  private url: string = BACKEND + 'users/';

  constructor(private authService: AuthService,
              private http: HttpClient) {}

  /**
   * Creates new user of the application
   */
  create(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(this.url + 'register?format=json', {
     'username': user.username, 'password': user.password, 'email': user.email,
    });
  }

  /**
   * Retrieves current User username and e-mail
   */
  retrieve(): Observable<UserInterface> {
    return this.http.get<UserInterface>(this.url,
      { headers: this.authService.getHeaders() });
  }

  /**
   * Partially updates username and email of the current User
   */
  update(user: UserInterface): Observable<UserInterface> {
    return this.http.patch<UserInterface>(this.url + user.id.toString() + '/', {
     'id': user.id, 'username': user.username, 'email': user.email,
    } , { headers: this.authService.getHeaders() });
  }
}
