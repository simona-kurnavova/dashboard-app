import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BACKEND, CLIENT_ID, CLIENT_SECRET} from '../settings';
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
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    });
    const params = new URLSearchParams();
    params.append('username', loginData.username);
    params.append('password', loginData.password);
    params.append('grant_type', 'password');

    return this.http.post(BACKEND + 'o/token/', params.toString(), {headers: headers});
  }

  /**
   * Refreshes token with refresh_token.
   */
  refreshToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    });
    const params = new URLSearchParams();
    params.append('refresh_token', localStorage.getItem('refresh_token'));
    params.append('grant_type', 'refresh_token');

    return this.http.post(BACKEND + 'o/token/', params.toString(), {headers: headers});
  }

  /**
   * Stores access token, refresh token and expiration date in browser, redirects to home page
   */
  saveToken(token): void {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    localStorage.setItem('expire_date', expireDate.toString());
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('refresh_token', token.refresh_token);
    this.router.navigate(['/home']);
  }

  /**
   * Checks if user is logged in. If possible, tries to refresh token, if not, redirects to login page
   */
  checkCredentials(): void {
    if (localStorage.getItem('access_token')) {
      if (+localStorage.getItem('expire_date') <= new Date().getTime()) {
        this.refreshToken().subscribe(
          data => this.saveToken(data),
          () => this.router.navigate(['/login'])
        );
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Checks if user is logged in.
   */
  isLoggedIn(): Boolean {
    if (!localStorage.getItem('access_token')) {
      return false;
    }
    return +localStorage.getItem('expire_date') > new Date().getTime();
  }

  /**
   * Deletes access token stored in browser and redirects to login page
   */
  logout(): void {
    this.deleteToken();
    this.router.navigate(['/login']);
  }

  /**
   * Is called from logout() and deletes access token, refresh token and expiration date from browser
   */
  deleteToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expire_date');
    localStorage.removeItem('refresh_token');
  }

  /**
   * Returns HTTP headers with access token for resource requests
   */
  getHeaders(): HttpHeaders {
    this.checkCredentials();
    return new HttpHeaders({
      'Content-type': 'application/json; ' + 'charset=utf-8',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
  }
}

















