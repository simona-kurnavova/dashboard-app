import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {BACKEND} from '../settings';
import {Observable} from 'rxjs/Observable';

/**
 * Interface for Widget object
 */
export interface WidgetInterface {
  id?: Number;
  dashboard: Number;
  app: Number;
  account?: Number;
  position_x: number;
  position_y: number;
  size_x: Number;
  size_y: Number;
  deleted?: Boolean;
}

/**
 * Service for CRUD operations of Widget objects. Every method returns Observable.
 */
@Injectable()
export class WidgetService {
  /**
   * Url to access widget API
   */
  url: string = BACKEND + 'widgets/';

  constructor(private http: HttpClient,
              private authService: AuthService) {}

  /**
   * Retrieves Widget with given id
   */
  retrieve(id: Number): Observable<WidgetInterface> {
    return this.http.get<WidgetInterface>(
      this.url + id.toString() + '/',
      {headers: this.authService.getHeaders()});
  }

  /**
   * Retrieves all Widgets objects owned by the logged in user
   */
  retrieveAll(): Observable<WidgetInterface[]> {
    return this.http.get<WidgetInterface[]>(this.url,
      {headers: this.authService.getHeaders()});
  }

  /**
   * Saves the new Widget object to database
   */
  create(widget: WidgetInterface): Observable<WidgetInterface> {
    return this.http.post<WidgetInterface>(this.url, {
      'dashboard': widget.dashboard,
      'app': widget.app,
      'account': widget.account,
      'position_x': widget.position_x,
      'position_y': widget.position_y,
      'size_x': widget.size_x,
      'size_y': widget.size_y
    }, {headers: this.authService.getHeaders()});
  }

  /**
   * Partially updates existing Widget object
   */
  edit(id: Number, widget: WidgetInterface): Observable<WidgetInterface> {
    return this.http.patch<WidgetInterface>(this.url + id.toString() + '/', {
      'account': widget.account,
      'position_x': widget.position_x,
      'position_y': widget.position_y,
      'size_x': widget.size_x,
      'size_y': widget.size_y
    }, {headers: this.authService.getHeaders()});
  }

  /**
   * Deletes Widget object with given id
   */
  delete(id: Number): Observable<WidgetInterface> {
    return this.http.delete<WidgetInterface>(this.url + id.toString() + '/',
      {headers: this.authService.getHeaders()});
  }
}





