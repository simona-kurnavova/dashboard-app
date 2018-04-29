import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {BACKEND} from '../settings';
import {Observable} from 'rxjs/Observable';

/**
 * Interface for Dashboard object
 */
export interface DashboardInterface {
  id?: Number;
  owner: Number;
}

/**
 * Service for CRUD operations of Dashboard objects. Every method returns Observable.
 */
@Injectable()
export class DashboardService {
  /**
   * Url to access dashboard API
   */
  url: string = BACKEND + 'dashboards/';

  constructor(private authService: AuthService,
              private http: HttpClient) {}

  /**
   * Retrieves Dashboard with given id
   */
  retrieve(id: Number): Observable<DashboardInterface> {
    return this.http.get<DashboardInterface>(
      this.url + id,
      {headers: this.authService.getHeaders()});
  }

  /**
   * Retrieves all Dashboard objects owned by the logged in user
   */
  retrieveAll(): Observable<DashboardInterface[]> {
    return this.http.get<DashboardInterface[]>(this.url,
      {headers: this.authService.getHeaders()});
  }

  /**
   * Saves the new Dashboard object to database with current user as owner
   */
  create(dashboard: DashboardInterface): Observable<DashboardInterface> {
    return this.http.post<DashboardInterface>(this.url, {},
      {headers: this.authService.getHeaders()});
  }

  /**
   * Partially updates existing Dashboard object
   */
  edit(id: Number, dashboard: DashboardInterface): Observable<DashboardInterface> {
    return this.http.put<DashboardInterface>(this.url + id + '/', {},
      {headers: this.authService.getHeaders()});
  }

  /**
   * Deletes Dashboard object with given id
   */
  delete(id: Number): Observable<DashboardInterface> {
    return this.http.delete<DashboardInterface>(this.url + id + '/',
      {headers: this.authService.getHeaders()});
  }
}
