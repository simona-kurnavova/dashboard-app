import {Injectable, OnInit} from '@angular/core';
// import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

@Injectable()
export class OneNoteApplicationService implements OnInit {
  static URL = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?';
  static CLIENT_ID = '78b9d80b-aab3-4615-8a23-5864573f967a';
  static REDIRECT_URI = 'http://localhost:4200/home/';
  static SCOPE = ['https://graph.microsoft.com/user.read'];
  private access_token: String;

  constructor() {
    this.access_token = null;
    this.parseToken();
  }

  ngOnInit() {}

  parseToken() {
    const cutUrl = (location.href.split('#'))[1];
    const token = (cutUrl.split('&'))[0];
    this.access_token = (token.split('='))[1];
    if (this.access_token) {
      console.log(this.access_token);
      this.saveToken();
    }
  }

  saveToken() {
    // TODO: save to DB
  }

  getToken() {
    window.location.href = OneNoteApplicationService.URL
      + 'client_id=' + OneNoteApplicationService.CLIENT_ID
      + '&response_type=token'
      + '&redirect_uri=' + OneNoteApplicationService.REDIRECT_URI
      + '&scope=' + OneNoteApplicationService.SCOPE
      + '&response_mode=fragment';
    }
}
