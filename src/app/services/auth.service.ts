import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CLIENT_ID, CLIENT_SECRET} from '../settings';
import {Observable} from 'rxjs/Observable';

/**
 * Service for authentication of the user and management of obtained access token
 */
@Injectable()
export class AuthService {
  constructor(private router: Router,
              private http: HttpClient) {}

  /**
   * Retrieves token according to login data provided
   */
  getToken(loginData): Observable<any> {
    const params = new URLSearchParams();
    params.append('username', loginData.username);
    params.append('password', loginData.password);
    params.append('grant_type', 'password');
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    });
    return this.http.post('http://127.0.0.1:8000/o/token/', params.toString(),
      {headers: headers});
  }

  /**
   * Stores access token in web browser
   */
  saveToken(token): void {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set('access_token', token.access_token, expireDate);
    this.router.navigate(['/home']);
  }

  /**
   * Checks if user is logged in. If not, redirects to login page
   */
  checkCredentials(): void {
    if (!Cookie.check('access_token')) {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Checks if user is logged in. If it is, redirects to home page
   */
  isLoggedIn(): void {
    if (Cookie.check('access_token')) {
      this.router.navigate(['/home']);
    }
  }

  /**
   * Deletes access token stored in browser and redirects to login page
   */
  logout(): void {
    Cookie.delete('access_token');
    this.router.navigate(['/login']);
  }

  /**
   * Returns HTTP headers with access token for resource requests
   */
  getHeaders(): HttpHeaders {
    this.checkCredentials();
    return new HttpHeaders({
      'Content-type': 'application/json; ' + 'charset=utf-8',
      'Authorization': 'Bearer ' + Cookie.get('access_token')
    });
  }
}

















