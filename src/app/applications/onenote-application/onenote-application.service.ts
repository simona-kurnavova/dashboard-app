import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class OneNoteApplicationService implements OnInit {
  static URL = 'https://login.microsoftonline.com/common/oauth2/v2.0/';
  static CLIENT_ID = '78b9d80b-aab3-4615-8a23-5864573f967a';
  static CLIENT_SECRET = 'jbmrWQW22}[^pepHFCP598#';
  static REDIRECT_URI = 'http://localhost:4200/home/';
  static SCOPE = [ 'https://graph.microsoft.com/Notes.ReadWrite.All' ];
  private code: String;

  constructor(private http: HttpClient) {
    this.code = null;
    this.parseCode();
  }

  ngOnInit() {}

  parseCode() {
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

  saveToken() {
    // TODO: save to DB
  }

  getToken() {
    window.location.href = OneNoteApplicationService.URL + 'authorize?'
      + 'client_id=' + OneNoteApplicationService.CLIENT_ID
      + '&response_type=code'
      + '&redirect_uri=' + OneNoteApplicationService.REDIRECT_URI
      + '&scope=' + OneNoteApplicationService.SCOPE
      + '&response_mode=fragment';
  }

  getAccessToken() {
    const url = 'https://login.microsoftonline.com/common/oauth2/v2.0/' + 'token?';
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
    });

    this.http.post(url, 'grant_type:authorization_code'
      + 'client_id=' + OneNoteApplicationService.CLIENT_ID
      + 'scope=' + OneNoteApplicationService.SCOPE
      + 'code=' + this.code
      + 'redirect_uri=' + OneNoteApplicationService.REDIRECT_URI
      + 'client_secret=' + OneNoteApplicationService.CLIENT_SECRET, {headers: headers}).subscribe(
      data => console.log(data),
      err => console.log(err)
    );
    // client_secret if does not work
  }

  getMessages() {
    console.log(this.code);
    const headers = new HttpHeaders({
      'Content-type': 'application/json; ' + 'charset=utf-8',
      'Authorization': 'Bearer ' + this.code.toString(),
    });
    this.http.get('https://graph.microsoft.com/v2.0/me/onenote/notebooks', {headers: headers}).subscribe(
      data => console.log(data),
      err => console.log(err)
    );
  }
}
