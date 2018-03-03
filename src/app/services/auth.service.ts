import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AccountInterface} from './account.service';

export interface UserInterface {
  username: String;
  password: String;
  email: String;
}

@Injectable()
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {
  }

  getToken(loginData) {
    const params = new URLSearchParams();
    params.append('username', loginData.username);
    params.append('password', loginData.password);
    params.append('grant_type', 'password');
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa('u9XjgyEGxDXtTDN80TG5tgk8TnHzGSmp7rqO5Gfs:UwUnaGxgKhEadmTz0j6so0VIzLZQHaAV1MfXBa10H0SSbjirskawdSfh7cGem5tmh06G4yCnUWSLZr8pfhVCxiGj3sPwmPbpyxMUHL6bT1DPT2uErrW5V8dne50tLoD1')
    });
    this.http.post('http://127.0.0.1:8000/o/token/', params.toString(), {headers: headers})
      .subscribe(
        data => this.saveToken(data),
        err => {
          // TODO: Invalid credentials error
          // TODO: No server connection error
          if (err.error instanceof Error) {
            throw new Error(err);
          } else {
            console.log(err.message);
          }
        }
      );
  }

  saveToken(token) {
    let expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set('access_token', token.access_token, expireDate);
    // TODO: Refresh token save and use after expiration
    this.router.navigate(['/']);
  }

  checkCredentials() {
    if (!Cookie.check('access_token')) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    Cookie.delete('access_token');
    this.router.navigate(['/login']);
  }

  getHeaders() {
    return new HttpHeaders({
      'Content-type': 'application/json; ' + 'charset=utf-8',
      'Authorization': 'Bearer ' + Cookie.get('access_token')
    });
  }
}

















