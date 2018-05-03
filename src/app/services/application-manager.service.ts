import {Injectable} from '@angular/core';
import {WidgetInterface, WidgetService} from './widget.service';
import {AccountInterface, AccountService} from './account.service';
import {Observable} from 'rxjs/Observable';

/**
 * Service for application to restrict access to database,
 * allows only basic necessary operation for applications to have access to
 */
@Injectable()
export class ApplicationManagerService {
  constructor(private accountService: AccountService,
              private widgetService: WidgetService) {}

  /**
   * Retrieves account of the widget
   */
  getAccount(widget: WidgetInterface): Observable<AccountInterface> {
    return this.accountService.retrieve(widget.account);
  }

  /**
   * Saves new account to database, but not widget
   */
  saveAccount(account: AccountInterface): Observable<AccountInterface> {
    return this.accountService.create(account);
  }

  /**
   * Updates widget - usually used when new account created
   */
  updateWidget(widget: WidgetInterface): Observable<WidgetInterface> {
    return this.widgetService.edit(widget.id, widget);
  }
}
