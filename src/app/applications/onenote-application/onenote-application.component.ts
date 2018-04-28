import {Component, OnInit} from '@angular/core';
import {MAPPINGS} from '../../components/main.components/application.component';
import {ApplicationBaseComponent} from '../application-base.component';
import {OneNoteApplicationService} from './onenote-application.service';

export interface Page {
  id?;
  title?;
  contentUrl?;
  content?: any;
  parentSection?: {
    id?;
  };
}
export interface Section {
  id?;
  displayName;
}

export interface Notebook {
  id?;
  displayName;
  sections?: Section[];
}

@Component({
  selector: 'onenote-application',
  templateUrl: './onenote-application.component.html',
  providers: [OneNoteApplicationService]
})

export class OneNoteApplicationComponent extends ApplicationBaseComponent implements OnInit {
  public notebookList: Notebook[] = [];
  public activeNotebook: Notebook;
  public activeSection: Section;
  public activePage: Page;
  public pageList: Page[] = [];
  public editor = {id: null, text: '', title: ''};
  public newNotebook: Notebook = {displayName: ''};
  public newSection: Section = {displayName: ''};
  public view;

  constructor(private appService: OneNoteApplicationService) {
    super();
  }

  ngOnInit() {
    this.activeNotebook = null;
    this.activeSection = null;
    this.activePage = null;
    if (this.appService.isLoggedIn()) {
      this.setView('notebooks');
      this.getResources();
    } else {
      if (this.appService.tokenExists()) {
        this.appService.login();
      } else {
        this.setView('no account');
      }
    }
  }

  getCode() {
    this.appService.getCode();
  }

  getAccessToken() {
    // TODO: alerts
    this.appService.getAccessToken().subscribe(
      data => {
        console.log(data);
        this.appService.saveToken(data);
        this.getResources();
      },
      err => console.log(err)
    );
  }

  getResources() {
    this.getNotebooks();
    this.getPages();
  }

  getNotebooks() {
    // TODO: alerts
    this.appService.getNotebooks().subscribe(
      data => {
        this.notebookList = <Notebook[]>data['value'];
        for (let i = 0; i < this.notebookList.length; i++) {
          this.appService.getSections(this.notebookList[i].id).subscribe(
            data => {
                this.notebookList[i].sections = <Section[]>data['value'];
                console.log(data['value']);
            },
            err => console.log(err)
          );
        }
        console.log(this.notebookList.length);
      },
      err => console.log(err)
    );
  }

  getPages() {
    // TODO: alerts
    this.appService.getAllPages().subscribe(
      data => {
        console.log(data);
        this.pageList = <Page[]>data['value'];
        for (let i = 0; i < this.pageList.length; i++) {
          this.appService.getPage(this.pageList[i].contentUrl).subscribe(
            data => {},
            err => {
              if (err.status === 200) {
                this.pageList[i].content = err.error.text;
              }
            }
          );
        }
      },
      err => console.log(err)
    );
  }
  openNotebook(notebook: Notebook) {
    this.view = 'sections';
    this.activeSection = null;
    this.activeNotebook = notebook;
  }

  openSection(section: Section) {
    this.view = 'pages';
    this.activeSection = section;
  }

  openPage(page: Page) {
    this.setView('page');
    this.activePage = page;
  }

  setView(view: String) {
    if (view === 'all pages' || view === 'notebooks') {
      this.activeNotebook = null;
      this.activeSection = null;
    }
    this.view = view;
  }

  openEditor(section: Section) {
    this.setView('editor');
    this.activeSection = section;
  }

  openSectionEditor(notebook: Notebook) {
    this.setView('editor-section');
    this.activeNotebook = notebook;
  }

  editPage() {
    this.editor = this.appService.parsePage(this.activePage);
    this.openEditor(this.activeSection);
  }

  createPage() {
    // TODO: error and success handling
    const html = `<!DOCTYPE html><html><head><title>` + this.editor.title + `</title></head>`
    + `<body>` + this.editor.text + `</body></html>`;

    if (this.editor.id) {
      this.appService.editPage(this.editor.id, this.activeSection.id, html);
      // TODO callback
      return;
    }
    this.appService.createPage(this.activeSection.id, html).subscribe(
      data => {
        console.log(data);
       this.getResources();
      },
          err => console.log(err)
    );
  }

  deletePage(page: Page) {
    this.appService.deletePage(page.id).subscribe(
      data => {
        console.log(data);
        this.getResources();
      },
          err => console.log(err)
    );
  }

  createNotebook() {
    this.appService.createNotebook(this.newNotebook).subscribe(
      data => {
        console.log(data);
        this.getResources();
      },
          err => console.log(err)
    );
  }

  createSection() {
    this.appService.createSection(this.activeNotebook.id, this.newSection).subscribe(
      data => {
        console.log(data);
        this.getResources();
      },
      err => console.log(err)
    );
  }
}

MAPPINGS['onenote-application'] = OneNoteApplicationComponent;
