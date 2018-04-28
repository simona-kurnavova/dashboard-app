import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BACKEND} from '../../settings';
import {Observable} from 'rxjs/Observable';
import {Notebook, Page} from './onenote-application.component';

@Injectable()
export class OneNoteApplicationService implements OnInit {
  static URL = 'https://login.microsoftonline.com/common/oauth2/v2.0/';
  static URL_RESOURCES = 'https://graph.microsoft.com/v1.0/me/onenote/';
  static CLIENT_ID = '78b9d80b-aab3-4615-8a23-5864573f967a';
  static REDIRECT_URI = 'http://localhost:4200/home/';
  static SCOPE = [ 'https://graph.microsoft.com/Notes.ReadWrite.All'];

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
  }

  saveToken(data) {
    // TODO: save token to DB and pull from it
    const expiresAt =  new Date().getTime() + (1000 * data['expires_in']);
    localStorage.setItem('onenote_access_token', data['access_token']);
    localStorage.setItem('onenote_refresh_token', data['refresh_token']);
    console.log(data['refresh_token']);
    localStorage.setItem('onenote_expires_at', expiresAt.toString());
  }

  getCode() {
    window.location.href = OneNoteApplicationService.URL + 'authorize?'
      + 'client_id=' + OneNoteApplicationService.CLIENT_ID
      + '&response_type=code'
      + '&redirect_uri=' + OneNoteApplicationService.REDIRECT_URI
      + '&scope=' + 'openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2FNotes.ReadWrite.All'
      + '&response_mode=fragment';
  }

  getAccessToken(): Observable<any> {
    return this.http.post(BACKEND + 'onenote/token', {
      'code': this.code
    });
  }

  refreshToken(): Observable<any> {
    return this.http.post(BACKEND + 'onenote/refresh_token', {
      'refresh_token': localStorage.getItem('onenote_refresh_token'),
    });
  }

  getNotebooks(): Observable<any> {
    return this.http.get(OneNoteApplicationService.URL_RESOURCES + 'notebooks',
      {headers: this.getHeaders() });
  }

  getSections(id: number): Observable<any> {
    // notebooks/{id}/sections
    return this.http.get(OneNoteApplicationService.URL_RESOURCES + 'notebooks/' + id.toString() + '/sections',
      {headers: this.getHeaders()});
  }

  getAllPages(): Observable<any> {
    return this.http.get(OneNoteApplicationService.URL_RESOURCES + 'pages',
      {headers: this.getHeaders()});
  }

  getPage(url: string): Observable<any> {
    // 'Accept':'text/html' headers
    return this.http.get(url, {headers: this.getHeaders()});
  }

  createNotebook(notebook: Notebook): Observable<any> {
    return this.http.post(OneNoteApplicationService.URL_RESOURCES + 'notebooks', {
        'displayName': notebook.displayName
      }, {headers: this.getHeaders()}
    );
  }

  createSection(notebookId: number, section): Observable<any> {
    return this.http.post(OneNoteApplicationService.URL_RESOURCES + 'notebooks/' + notebookId.toString() + '/sections',
      {
        'displayName': section.displayName,
      }, {headers: this.getHeaders()});
  }

  createPage(sectionId: string, text): Observable<any> {
    const headers = {
      'Content-type': 'text/html',
      'Authorization': 'Bearer ' + localStorage.getItem('onenote_access_token'),
    };
    return this.http.post(OneNoteApplicationService.URL_RESOURCES + 'sections/' + sectionId.toString() + '/pages',
      text, {headers: headers});
  }

  editPage(id: string, sectionId: string, text){
    this.deletePage(id).subscribe(
      data => {
        this.createPage(sectionId, text).subscribe(
          data => console.log(data),
          err => console.log(err)
        );
      }
    );
  }

  deletePage(id: string): Observable<any> {
    return this.http.delete(OneNoteApplicationService.URL_RESOURCES + 'pages/' + id,
      {headers: this.getHeaders()});
  }

    getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-type': 'application/json; ' + 'charset=utf-8',
      'Authorization': 'Bearer ' + localStorage.getItem('onenote_access_token'),
    });
  }

  isLoggedIn(): Boolean {
    if (!localStorage.getItem('onenote_access_token')) {
      return false;
    }
    return +localStorage.getItem('onenote_expires_at') > new Date().getTime();
  }

  login() {
    this.refreshToken().subscribe(
      data => {
        console.log(data);
        this.saveToken(data);
      },
      err => console.log(err)
    );
  }

  tokenExists(): Boolean {
     return !!localStorage.getItem('onenote_refresh_token');
  }

  parsePage(page: Page) {
    const editor = {id: page.id, title: '', text: ''};
    const el = document.createElement( 'html' );
    el.innerHTML = page.content;
    const nodeListTitle = el.getElementsByTagName( 'title' );
    for (let index = 0; index < nodeListTitle.length; index++) {
      editor.title += nodeListTitle[index].innerHTML;
    }
    const nodeListText = el.getElementsByTagName( 'body' );
    for (let index = 0; index < nodeListText.length; index++) {
      editor.text += nodeListText[index].innerHTML;
    }
    return editor;
  }
}
