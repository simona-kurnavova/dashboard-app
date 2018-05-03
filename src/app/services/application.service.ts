import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {BACKEND} from '../settings';
import {Observable} from 'rxjs/Observable';

/**
 * Interface for App object
 */
export interface ApplicationInterface {
  id?: number;
  name: String;
  description?: String;
  required_account?: String;
  allows_small_sizes?: Boolean;
}

/**
 * Service for CRUD operations of App objects. Every method returns Observable.
 */
@Injectable()
export class ApplicationService {
  /**
   * Url to access application API
   */
  url: string = BACKEND + 'apps/';

  constructor(private authService: AuthService,
              private http: HttpClient) {}

  /**
   * Retrieves App with given id
   */
  retrieve(id: Number): Observable<ApplicationInterface> {
    return this.http.get<ApplicationInterface>(
      this.url + id,
      {headers: this.authService.getHeaders()});
  }

  /**
   * Retrieves all App objects available
   */
  retrieveAll(): Observable<ApplicationInterface[]> {
    return this.http.get<ApplicationInterface[]>(this.url,
      {headers: this.authService.getHeaders()});
  }

  /**
   * Saves the new App object to database
   */
  create(app: ApplicationInterface): Observable<ApplicationInterface> {
    return this.http.post<ApplicationInterface>(this.url, {
      'name': app.name, 'description': app.description, 'required_account': app.required_account,
      'allows_small_sizes': app.allows_small_sizes
    }, {headers: this.authService.getHeaders()});
  }

  /**
   * Partially updates existing App object
   */
  edit(id: Number, app: ApplicationInterface): Observable<ApplicationInterface>  {
    return this.http.put<ApplicationInterface>(this.url + id + '/', {
      'name': app.name, 'description': app.description, 'required_account': app.required_account,
      'allows_small_sizes': app.allows_small_sizes
    }, {headers: this.authService.getHeaders()});
  }

  /**
   * Deletes App object with given id
   */
  delete(id: Number): Observable<ApplicationInterface>  {
    return this.http.delete<ApplicationInterface>(this.url + id + '/',
      {headers: this.authService.getHeaders()});
  }
}

