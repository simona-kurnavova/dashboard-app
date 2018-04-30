import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BACKEND} from '../../settings';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {AccountInterface, AccountService} from '../../services/account.service';

@Injectable()
export class OneNoteApplicationService {
  static URL = 'https://login.microsoftonline.com/common/oauth2/v2.0/';
  static URL_RESOURCES = 'https://graph.microsoft.com/v1.0/me/onenote/';
  static CLIENT_ID = '78b9d80b-aab3-4615-8a23-5864573f967a';
  static REDIRECT_URI = 'http://localhost:4200/home/';
  private code: String;

  /**
   * Checks if it is possible to parse code from URL. In case of redirect from Microsoft login page
   */
  constructor(private http: HttpClient,
              private router: Router,
              private accountService: AccountService) {
    this.code = '';
    this.parseCode();
  }

  /**
   * Redirects user to Microsoft login URL with necessary parameters
   */
  getCode() {
    window.location.href = OneNoteApplicationService.URL + 'authorize?'
      + 'client_id=' + OneNoteApplicationService.CLIENT_ID
      + '&response_type=code'
      + '&redirect_uri=' + OneNoteApplicationService.REDIRECT_URI
      + '&scope=' + 'openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2FNotes.ReadWrite.All'
      + '&response_mode=fragment';
  }

  /**
   * Returns true if code exists and app can request access token
   */
  codeExists(): Boolean {
    return this.code !== '';
  }

  /**
   * Parses code from the URL after redirection from Microsoft login page
   */
  parseCode() {
    const cutUrl = (location.href.split('#'));
    if (cutUrl.length >= 2) {
      const code_string = (cutUrl[1].split('&'))[0];
      const temp_code = (code_string.split('='));
      if (temp_code.length >= 2) {
        this.code = temp_code[1];
        this.router.navigate(['/home']);
      }
    }
  }

  /**
   * Sends request for access token to server
   */
  getAccessToken(): Observable<any> {
    return this.http.post(BACKEND + 'onenote/token', {
      'code': this.code
    });
  }

  /**
   * Sends request for access token with refresh token to server
   */
  refreshToken(account: AccountInterface): Observable<any> {
    return this.http.post(BACKEND + 'onenote/refresh_token', {
      'refresh_token': account.token,
    });
  }

  /**
   * Saves obtained access token to local storage and database
   */
  saveToken(data): Observable<any> {
    const expiresAt =  new Date().getTime() + (1000 * data['expires_in']);
    localStorage.setItem('onenote_access_token', data['access_token']);
    localStorage.setItem('onenote_refresh_token', data['refresh_token']);
    localStorage.setItem('onenote_expires_at', expiresAt.toString());
    const account: AccountInterface = {
      id: null, token: data['refresh_token'], name: 'OneNote', type: 'onenote', info: 'Microsoft account'
    };
    return this.accountService.create(account);
  }

  /**
   * Sends request for notebooks to Microsoft Graph API
   */
  getNotebooks(): Observable<any> {
    return this.http.get(OneNoteApplicationService.URL_RESOURCES + 'notebooks',
      {headers: this.getHeaders() });
  }

  /**
   * Sends request for sections of given notebook to Microsoft Graph API
   */
  getSections(notebookId: number): Observable<any> {
    return this.http.get(OneNoteApplicationService.URL_RESOURCES + 'notebooks/' + notebookId.toString() + '/sections',
      {headers: this.getHeaders()});
  }

  /**
   * Send request for all pages owned by the user to Microsoft Graph API
   */
  getAllPages(): Observable<any> {
    return this.http.get(OneNoteApplicationService.URL_RESOURCES + 'pages',
      {headers: this.getHeaders()});
  }

  /**
   * Send request for specific page to Microsoft Graph API
   */
  getPage(url: string): Observable<any> {
    return this.http.get(url, {headers: this.getHeaders()});
  }

  /**
   * Creates new notebook via Microsoft Graph API
   */
  createNotebook(notebook: Notebook): Observable<any> {
    return this.http.post(OneNoteApplicationService.URL_RESOURCES + 'notebooks', {
        'displayName': notebook.displayName
      }, {headers: this.getHeaders()}
    );
  }

  /**
   * Creates new section via Microsoft Graph API
   */
  createSection(notebookId: number, section): Observable<any> {
    return this.http.post(OneNoteApplicationService.URL_RESOURCES + 'notebooks/' + notebookId.toString() + '/sections',
      {
        'displayName': section.displayName,
      }, {headers: this.getHeaders()});
  }

  /**
   * Creates new page via Microsoft Graph API
   */
  createPage(sectionId: string, text): Observable<any> {
    const headers = {
      'Content-type': 'text/html',
      'Authorization': 'Bearer ' + localStorage.getItem('onenote_access_token'),
    };
    return this.http.post(OneNoteApplicationService.URL_RESOURCES + 'sections/' + sectionId.toString() + '/pages',
      text, {headers: headers});
  }

  /**
   * Creates new page and deletes the old one with the given id via Microsoft Graph API
   * Solved this way for the overcomplications with patch provided by Microsoft
   */
  editPage(id: string, sectionId: string, text) {
    this.deletePage(id).subscribe(
      data => {
        this.createPage(sectionId, text).subscribe(
          data => console.log(data),
          err => console.log(err)
        );
      }
    );
  }

  /**
   * Deletes page via Microsoft Graph API
   */
  deletePage(id: string): Observable<any> {
    return this.http.delete(OneNoteApplicationService.URL_RESOURCES + 'pages/' + id,
      {headers: this.getHeaders()});
  }

  /**
   * Returns headers with access token
   */
  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-type': 'application/json; ' + 'charset=utf-8',
      'Authorization': 'Bearer ' + localStorage.getItem('onenote_access_token'),
    });
  }

  /**
   * Returns true if user is logged in and have valid access token
   */
  isLoggedIn(): Boolean {
    if (!localStorage.getItem('onenote_access_token')) {
      return false;
    }
    return +localStorage.getItem('onenote_expires_at') > new Date().getTime();
  }

  /**
   * Parses HTML of an page for editation
   */
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

/**
 * Type for Microsoft OneNote Page
 */
export interface Page {
  id?;
  title?;
  contentUrl?;
  content?: any;
  parentSection?: {
    id?;
  };
}

/**
 * Type for Microsoft OneNote Section
 */
export interface Section {
  id?;
  displayName;
}

/**
 * Type for Microsoft OneNote Notebook
 */
export interface Notebook {
  id?;
  displayName;
  sections?: Section[];
}
