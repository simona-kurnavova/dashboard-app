import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BACKEND} from '../../settings';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class OneNoteApplicationService implements OnInit {
  static URL = 'https://login.microsoftonline.com/common/oauth2/v2.0/';
  static URL_RESOURCES = 'https://graph.microsoft.com/v1.0/me/onenote/';
  static CLIENT_ID = '78b9d80b-aab3-4615-8a23-5864573f967a';
  static REDIRECT_URI = 'http://localhost:4200/home/';
  static SCOPE = [ 'https://graph.microsoft.com/Notes.ReadWrite.All' ];

  private code: String;

  constructor(private http: HttpClient) {
    this.code = null;
    this.parseCode();
  }

  ngOnInit() {}

  parseCode() {
    // TODO: stupid way to do it!
    if (location.href === 'http://localhost:4200/home') {
      return;
    }
    const cutUrl = (location.href.split('#'))[1];
    const code_string = (cutUrl.split('&'))[0];
    this.code = (code_string.split('='))[1];
    if (this.code) {
      console.log(this.code);
    }
  }

  saveToken(data) {
    const expiresAt =  new Date().getTime() + (1000 * data['expires_in']);
    localStorage.setItem('onenote_access_token', data['access_token']);
    localStorage.setItem('onenote_expires_at', expiresAt.toString());
  }

  getCode() {
    window.location.href = OneNoteApplicationService.URL + 'authorize?'
      + 'client_id=' + OneNoteApplicationService.CLIENT_ID
      + '&response_type=code'
      + '&redirect_uri=' + OneNoteApplicationService.REDIRECT_URI
      + '&scope=' + OneNoteApplicationService.SCOPE
      + '&response_mode=fragment';
  }

  getAccessToken(): Observable<any> {
    return this.http.post(BACKEND + 'onenote/token', {
      'code': this.code
    });
  }

  getNotebooks(): Observable<any> {
    return this.http.get(OneNoteApplicationService.URL_RESOURCES + 'notebooks',
      {headers: this.getHeaders()});
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-type': 'application/json; ' + 'charset=utf-8',
      'Authorization': 'Bearer ' + localStorage.getItem('onenote_access_token'),
    });
  }
}
