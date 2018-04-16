import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {BACKEND} from '../settings';

export interface ApplicationInterface {
  name: String;
  description: String;
  required_account: String;
}

@Injectable()
export class ApplicationService {
  url = BACKEND + 'apps/';

  constructor(private authService: AuthService, private http: HttpClient) {}

  retrieve(id: Number) {
    return this.http.get<ApplicationInterface>(
      this.url + id,
      {headers: this.authService.getHeaders()});
  }

  retrieveAll() {
    return this.http.get(this.url, {headers: this.authService.getHeaders()});
  }

  create(app: ApplicationInterface) {
    return this.http.post<ApplicationInterface>(this.url, {
      'name': app.name, 'description': app.description, 'required_account': app.required_account
    }, {headers: this.authService.getHeaders()});
  }

  edit(id: Number, account: ApplicationInterface) {
    return this.http.put<ApplicationInterface>(this.url + id + '/', {
      'name': account.name, 'description': account.description, 'required_account': account.required_account,
    }, {headers: this.authService.getHeaders()});
  }

  delete(id: Number) {
    return this.http.delete(this.url + id + '/', {headers: this.authService.getHeaders()});
  }
}

