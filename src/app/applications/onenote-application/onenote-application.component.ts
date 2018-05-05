import {Component, OnInit} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {ApplicationBaseComponent} from '../../components/main.components/application-base.component';
import {OneNoteApplicationService, Section, Notebook, Page} from './onenote-application.service';
import {AlertInterface, SERVER_ERROR_ALERT} from '../../alert-definitions';
import {
  ALREADY_DELETED_ERROR,
  SUCCESS_CREATING_NOTEBOOK_ALERT,
  SUCCESS_CREATING_PAGE_ALERT, SUCCESS_CREATING_SECTION_ALERT, SUCCESS_DELETING_PAGE_ALERT,
  SUCCESS_EDITING_PAGE_ALERT
} from './alerts';
import {AccountInterface} from '../../services/account.service';
import {ApplicationManagerService} from '../../services/application-manager.service';

/**
 * OneNote application component
 */

@Component({
  selector: 'onenote-application',
  templateUrl: './onenote-application.component.html',
  providers: [OneNoteApplicationService, ApplicationManagerService]
})

export class OneNoteApplicationComponent extends ApplicationBaseComponent implements OnInit {
  /**
   * List of notebooks
   */
  public notebookList: Notebook[] = [];
  /**
   * active notebook
   */
  public activeNotebook: Notebook = null;
  /**
   * Active section
   */
  public activeSection: Section = null;
  /**
   * Active page
   */
  public activePage: Page = null;
  /**
   * List of pages
   */
  public pageList: Page[] = [];
  /**
   * Text and title of page being edited
   */
  public editor = {id: null, text: '', title: ''};
  /**
   * New notebook being created
   */
  public newNotebook: Notebook = {displayName: ''};
  /**
   * New section being created
   */
  public newSection: Section = {displayName: ''};
  /**
   * Current view
   */
  public view;
  /**
   * Array of alerts for AlertComponent
   */
  public alerts: AlertInterface[] = [];
  /**
   * Microsoft account
   */
  private account: AccountInterface;

  constructor(private appService: OneNoteApplicationService,
              private appManagerService: ApplicationManagerService) {
    super();
  }

  /**
   * Calls getInitState()
   */
  ngOnInit() {
    this.setView('notebook');
    this.getInitState();
  }

  /**
   * Initialises state of the app
   */
  getInitState() {
    if (this.widget.account) {
      this.appManagerService.getAccount(this.widget).subscribe(
        data => {
          this.account = <AccountInterface>data;

          /* if user is already logged in with valid token */
          if (this.appService.isLoggedIn()) {
            this.getResources();
            return;
          }
          /* if user has expired token */
          this.appService.refreshToken(this.account).subscribe(
            data => {
              this.saveToken(data);
              return;
            }, () => this.getAccessFromUser()
          );
        }
      );
    }
    this.getAccessFromUser();
  }

  /**
   * Gets access on the behalf of user
   */
  getAccessFromUser() {
    if (this.appService.codeExists()) {
      this.getAccessToken();
    } else {
      this.setView('no account');
    }
  }
  /**
   * Redirects user to Microsoft login page for allowing app to use resources and obtain code
   */
  getCode() {
    this.appService.getCode();
  }

  /**
   * Retrieve access token
   */
  getAccessToken() {
    this.appService.getAccessToken().subscribe(
      data => {
          this.saveToken(data);
      }, () => this.alerts.push(SERVER_ERROR_ALERT)
    );
  }

  /**
   * Saves token to database and local storage
   */
  saveToken(data) {
    this.appService.saveToken(data).subscribe(
      result => {
        this.widget.account = <AccountInterface>result.id;
        this.account = <AccountInterface>result;
        this.appManagerService.updateWidget(this.widget).subscribe();
        this.getResources();
      }
    );
  }

  /**
   * Retrieves notebooks, sections and pages. Sets view as 'notebook'
   */
  getResources() {
    this.getNotebooks();
    this.setView('notebooks');
  }

  /**
   * Retrieves notebooks, sections and pages
   */
  getNotebooks() {
    this.appService.getNotebooks().subscribe(
      data => {
        this.notebookList = <Notebook[]>data['value'];
        for (let i = 0; i < this.notebookList.length; i++) {
          this.appService.getSections(this.notebookList[i].id).subscribe(
            data => {
              this.notebookList[i].sections = <Section[]>data['value']
            },
            () => {
              this.alerts.push(SERVER_ERROR_ALERT);
              return;
            }
          );
        }
        this.getPages();
      }, () => this.alerts.push(SERVER_ERROR_ALERT)
    );
  }

  /**
   * Retrieves pages
   */
  getPages() {
    this.appService.getAllPages().subscribe(
      data => {
        this.pageList = [];
        const list = <Page[]>data['value'];
        for (let i = 0; i < list.length; i++) {
          this.appService.getPage(list[i].contentUrl).subscribe(
            () => {},
            err => {
              if (err.status !== 404) {
                list[i].content = err.error.text;
                this.pageList.push(list[i]);
              }
            }
          );
        }
      }, () => this.alerts.push(SERVER_ERROR_ALERT)
    );
  }

  /**
   * Opens notebook
   */
  openNotebook(notebook: Notebook) {
    this.view = 'sections';
    this.activeSection = null;
    this.activeNotebook = notebook;
  }

  /**
   * Opens section
   */
  openSection(section: Section) {
    this.view = 'pages';
    this.activeSection = section;
  }

  /**
   * @param {Page} page
   */
  openPage(page: Page) {
    this.setView('page');
    this.activePage = page;
  }

  /**
   * Sets view as a given string
   */
  setView(view: String) {
    this.alerts = [];
    if (view === 'all pages' || view === 'notebooks') {
      this.activeNotebook = null;
      this.activeSection = null;
    }
    this.view = view;
  }

  /**
   * Opens editor of page
   */
  openEditor(section: Section) {
    this.setView('editor');
    this.activeSection = section;
  }

  /**
   * Opens section editor
   */
  openSectionEditor(notebook: Notebook) {
    this.setView('editor-section');
    this.activeNotebook = notebook;
  }

  /**
   * Opens editor for page edit
   */
  editPage() {
    this.editor = this.appService.parsePage(this.activePage);
    this.openEditor(this.activeSection);
  }

  /**
   * Creates or edits existing page
   */
  createPage() {
    const html = `<!DOCTYPE html><html><head><title>` + this.editor.title + `</title></head>`
    + `<body>` + this.editor.text + `</body></html>`;

    if (this.editor.id) {
      this.appService.editPage(this.editor.id, this.activeSection.id, html);
      this.getResources();
      this.alerts.push(SUCCESS_EDITING_PAGE_ALERT);
      return;
    }
    this.appService.createPage(this.activeSection.id, html).subscribe(
      (data) => {
        this.getResources();
        console.log(data);
        this.alerts.push(SUCCESS_CREATING_PAGE_ALERT);
      }, () => this.alerts.push(SERVER_ERROR_ALERT)
    );
  }

  /**
   * Deletes page
   */
  deletePage(page: Page) {
    this.appService.deletePage(page.id).subscribe(
      () => {
        for (let i = 0; i < this.pageList.length; i++) {
          if (this.pageList[i].id === page.id) {
            this.pageList.splice(i, 1);
            break;
          }
        }
        this.setView('all pages');
        this.alerts.push(SUCCESS_DELETING_PAGE_ALERT);
      }, (err) => {
        console.log(err);
        if (err.status === 404) {
          this.alerts.push(ALREADY_DELETED_ERROR);
        } else {
          this.alerts.push(SERVER_ERROR_ALERT);
        }
      }
    );
  }

  /**
   * Creates new notebook
   */
  createNotebook() {
    this.appService.createNotebook(this.newNotebook).subscribe(
      (data) => {
        this.getResources();
        console.log(data);
        this.alerts.push(SUCCESS_CREATING_NOTEBOOK_ALERT);
      }, () => this.alerts.push(SERVER_ERROR_ALERT)
    );
  }

  /**
   * Creates new section
   */
  createSection() {
    this.appService.createSection(this.activeNotebook.id, this.newSection).subscribe(
      (data) => {
        this.getResources();
        console.log(data);
        this.alerts.push(SUCCESS_CREATING_SECTION_ALERT);
      }, () => this.alerts.push(SERVER_ERROR_ALERT)
    );
  }
}

MAPPINGS['onenote-application'] = OneNoteApplicationComponent;
